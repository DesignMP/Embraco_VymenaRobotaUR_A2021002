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
define(["require", "exports", "../common/widgetBase", "../common/domHelper", "../common/themeProvider", "../../common/fileProvider", "../../models/diagnostics/trace/traceConfig/traceConfigDefines"], function (require, exports, widgetBase_1, domHelper_1, themeProvider_1, fileProvider_1, traceConfigDefines_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Layout styles for dynamic layout
     *
     * @enum {number}
     */
    var LayoutStyle;
    (function (LayoutStyle) {
        LayoutStyle[LayoutStyle["Default"] = 0] = "Default";
        LayoutStyle[LayoutStyle["MinimizeStep1"] = 1] = "MinimizeStep1";
        LayoutStyle[LayoutStyle["MinimizeStep2"] = 2] = "MinimizeStep2";
        LayoutStyle[LayoutStyle["MinimizeStep3"] = 3] = "MinimizeStep3";
    })(LayoutStyle || (LayoutStyle = {}));
    /**
     * The texts for the buttons
     *
     * @class ButtonTexts
     */
    var ButtonTexts = /** @class */ (function () {
        function ButtonTexts() {
        }
        // Default button texts
        ButtonTexts.Activate = "Activate";
        ButtonTexts.ForceStart = "Force start";
        ButtonTexts.ForceStop = "Force stop";
        ButtonTexts.SaveTraceConfiguration = "Save trace configuration";
        ButtonTexts.ImportTraceConfiguration = "Import trace configuration";
        ButtonTexts.ExportTraceConfiguration = "Export trace configuration";
        // Minimized button texts
        ButtonTexts.SaveTraceConfigurationMinimized = "Save";
        ButtonTexts.ImportTraceConfigurationMinimized = "Import";
        ButtonTexts.ExportTraceConfigurationMinimized = "Export";
        return ButtonTexts;
    }());
    /**
     * implements the TraceControlWidget
     *
     * @class TraceControlWidget
     * @extends {WidgetBase}
     */
    var TraceControlWidget = /** @class */ (function (_super) {
        __extends(TraceControlWidget, _super);
        function TraceControlWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._actualTraceState = traceConfigDefines_1.TraceStateIds.Disabled;
            _this._saveConfigIsActive = false;
            _this._activateIsActive = false;
            _this._fileProvider = new fileProvider_1.FileProvider();
            _this._uploadDataFinishedHandler = function (sender, args) { return _this.onUploadDataFinished(sender, args); };
            /**
             * Default button width for active button
             *
             * @private
             * @memberof TraceControlWidget
             */
            _this._defaultButtonWidth1 = "85px";
            /**
             * Default button width for force start/stop button
             *
             * @private
             * @memberof TraceControlWidget
             */
            _this._defaultButtonWidth2 = "100px";
            /**
             * Default button width for save/import/export trace config buttons
             *
             * @private
             * @memberof TraceControlWidget
             */
            _this._defaultButtonWidth3 = "195px";
            /**
             * Minimized Step 1 button width for save/import/export trace config buttons
             *
             * @private
             * @memberof TraceControlWidget
             */
            _this._defaultButtonWidth3MinimizedStep1 = "60px";
            /**
             * Minimized Step 2 button width for save/import/export trace config buttons
             *
             * @private
             * @memberof TraceControlWidget
             */
            _this._defaultButtonWidth3MinimizedStep2 = "16px";
            /**
             * Default left position of the save/import/export buttons
             *
             * @private
             * @memberof TraceControlWidget
             */
            _this._leftPositionStart = 730;
            /**
             * Default space between the  save/import/export buttons
             *
             * @private
             * @memberof TraceControlWidget
             */
            _this._defaultButtonSpace = 35;
            return _this;
        }
        /** initialize the widget
         *
         * @param {string} layoutContainerId
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.initialize = function (layoutContainerId) {
            _super.prototype.initialize.call(this, layoutContainerId);
        };
        /**
         * Dispose some objects from this widget
         *
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.dispose = function () {
            // Dispose static button and fields
            this.destroyButton(this._activateButtonId);
            this.destroyField(this._stateFieldId);
            this.destroyButton(this._forceStartButtonId);
            this.destroyButton(this._forceStopButtonId);
            // Dispose dynamic buttons if available
            this.destroyButton(this._saveTraceConfigurationButtonId);
            this.destroyButton(this._importTraceConfigurationButtonId);
            this.destroyButton(this._exportTraceConfigurationButtonId);
            _super.prototype.dispose.call(this);
        };
        /**
         * Creates the widget content and eventually subwidgets
         *
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.createWidgets = function () {
            this.initButtonAndFieldIds();
            this.createDivButtonsAndFieldsLayout();
            this.addStaticButtons();
        };
        /**
         * Initializes the ids for the buttons and fields
         *
         * @private
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.initButtonAndFieldIds = function () {
            var layoutContainerId = this.parentContentId;
            this._activateButtonId = layoutContainerId + "_activateButton";
            this._forceStartButtonId = layoutContainerId + "_forceStartButton";
            this._forceStopButtonId = layoutContainerId + "_forceStopButton";
            this._saveTraceConfigurationButtonId = layoutContainerId + "_saveTraceConfigurationButton";
            this._importTraceConfigurationButtonId = layoutContainerId + "_importTraceConfigurationButton";
            this._exportTraceConfigurationButtonId = layoutContainerId + "_exportTraceConfigurationButton";
            this._stateFieldId = layoutContainerId + "tracecontrol_state";
            this._stateImage = layoutContainerId + "tracecontrol_state_image";
        };
        /**
         * Creates the layout for the buttons and fields
         *
         * @private
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.createDivButtonsAndFieldsLayout = function () {
            var element = $(this.cssParentContentId);
            element[0].style.paddingTop = "4px";
            element[0].style.background = "var(--main-grey-dark2)";
            element[0].style.overflow = "hidden";
            element.append("<div style='left: 25px; position: absolute;' id='" + this._activateButtonId + "'></div>");
            element.append("<div style='top: 10px; left: 150px; position: absolute;' class='traceControlStateImage' id='" + this._stateImage + "'></div>");
            element.append("<div style='top: 10px; left: 180px; position: absolute;' id='" + this._stateFieldId + "'></div>");
            element.append("<div style='left: 340px; position: absolute;' id='" + this._forceStartButtonId + "'></div>");
            element.append("<div style='left: 475px; position: absolute;' id='" + this._forceStopButtonId + "'></div>");
            element.append("<div style='left: " + this.getLeftPosition(0) + "px; position: absolute;' id='" + this._saveTraceConfigurationButtonId + "'></div>");
            element.append("<div style='left: " + this.getLeftPosition(1) + "px; position: absolute;' id='" + this._importTraceConfigurationButtonId + "'></div>");
            element.append("<div style='left: " + this.getLeftPosition(2) + "px; position: absolute;' id='" + this._exportTraceConfigurationButtonId + "'></div>");
        };
        /**
         * Returns the left position of a button for the given LayoutStyle
         *
         * @private
         * @param {number} index
         * @param {LayoutStyle} [layoutStyle=LayoutStyle.Default]
         * @returns {number}
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.getLeftPosition = function (index, layoutStyle) {
            if (layoutStyle === void 0) { layoutStyle = LayoutStyle.Default; }
            if (index == 0) {
                return this._leftPositionStart;
            }
            else {
                var defaultButtonWidth = this._defaultButtonWidth3;
                if (layoutStyle == LayoutStyle.MinimizeStep1) {
                    defaultButtonWidth = this._defaultButtonWidth3MinimizedStep1;
                }
                else if (layoutStyle == LayoutStyle.MinimizeStep2) {
                    defaultButtonWidth = this._defaultButtonWidth3MinimizedStep2;
                }
                var buttonWidth = parseInt(defaultButtonWidth, 10);
                return this._leftPositionStart + (index * (buttonWidth + this._defaultButtonSpace));
            }
        };
        /**
         * Creates the buttons and fields
         *
         * @private
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.addStaticButtons = function () {
            this.createButton(this._activateButtonId, ButtonTexts.Activate, this.getImagePath("play.svg"), this._defaultButtonWidth1);
            this.createField(this._stateFieldId);
            this.createButton(this._forceStartButtonId, ButtonTexts.ForceStart, this.getImagePath("record.svg"), this._defaultButtonWidth2);
            this.createButton(this._forceStopButtonId, ButtonTexts.ForceStop, this.getImagePath("stop.svg"), this._defaultButtonWidth2);
        };
        /**
         * Loads the styles for the trace control widget
         *
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.loadStyles = function () {
            _super.prototype.addStyle.call(this, "widgets/traceControlWidget/style/css/traceControlStyle.css");
            _super.prototype.addStyle.call(this, "widgets/traceControlWidget/style/css/traceControlButtonStyle.css");
        };
        /**
         * Activates/Deactivates a button
         *
         * @private
         * @param {string} id
         * @param {boolean} deactivate
         * @returns
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.deactivateButton = function (id, deactivate) {
            var ejButton = $("#" + id).data("ejButton");
            if (ejButton == undefined) {
                return;
            }
            this.setButtonCssClass(ejButton, deactivate);
            var buttonElement = $("#" + id)[0];
            var imagePath = this.getImagePathForId(id, deactivate);
            buttonElement.style.backgroundImage = "url('" + imagePath + "')";
            domHelper_1.DomHelper.disableElement(buttonElement, deactivate);
        };
        /**
         * Sets the layout of the button(e.g. text, size, left postion)
         *
         * @private
         * @param {string} id
         * @param {string} buttonText
         * @param {string} newSize
         * @param {string} newLeftPosition
         * @returns
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.setButtonLayout = function (id, buttonText, newSize, newLeftPosition) {
            var ejButton = $("#" + id).data("ejButton");
            if (ejButton == undefined) {
                return;
            }
            ejButton.option("text", buttonText, true);
            if (buttonText == "") {
                ejButton.option("contentType", ej.ContentType.ImageOnly, true);
            }
            else {
                ejButton.option("contentType", ej.ContentType.TextAndImage, true);
            }
            ejButton.option("width", newSize, true);
            var buttonElement = $("#" + id)[0];
            if (buttonElement != undefined) {
                buttonElement.style.left = newLeftPosition;
            }
        };
        /**
         * Returns the imagepath for the button ids
         *
         * @private
         * @param {string} buttonId
         * @param {boolean} deactivate
         * @returns {string}
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.getImagePathForId = function (buttonId, deactivate) {
            var imagePath;
            if (buttonId == this._forceStartButtonId) {
                imagePath = this.getImagePath("record.svg", deactivate);
            }
            else if (buttonId == this._forceStopButtonId) {
                imagePath = this.getImagePath("stop.svg", deactivate);
            }
            else if (buttonId == this._saveTraceConfigurationButtonId) {
                imagePath = this.getImagePath("save.svg", deactivate);
            }
            else if (buttonId == this._activateButtonId) {
                imagePath = this.getImagePath("play.svg", deactivate);
            }
            else if (buttonId == this._importTraceConfigurationButtonId) {
                imagePath = this.getImagePath("import.svg", deactivate);
            }
            else if (buttonId == this._exportTraceConfigurationButtonId) {
                imagePath = this.getImagePath("export.svg", deactivate);
            }
            return imagePath;
        };
        /**
         * Sets the Button css styles for activated or deactivated state
         *
         * @private
         * @param {*} ejButton
         * @param {boolean} deactivate
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.setButtonCssClass = function (ejButton, deactivate) {
            if (deactivate == true) {
                ejButton.option("cssClass", "traceControlButtonDeactivated", true);
            }
            else {
                ejButton.option("cssClass", "traceControlButton", true);
            }
        };
        /**
         * Creates a button with the given text and image
         *
         * @param {string} id
         * @param {string} text
         * @param {string} imagePath
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.createButton = function (id, text, imagePath, width) {
            var _this = this;
            $("#" + id).ejButton({
                text: text,
                contentType: ej.ContentType.TextAndImage,
                cssClass: "traceControlButton",
                prefixIcon: "e-icon",
                click: function (clickArgs) { return _this.click(id); },
                width: width,
            });
            var buttonElement = $("#" + id)[0];
            buttonElement.style.backgroundPositionX = "4px";
            buttonElement.style.backgroundPositionY = "4px";
            buttonElement.style.backgroundImage = "url('" + imagePath + "')";
            buttonElement.style.backgroundRepeat = "no-repeat";
            buttonElement.style.backgroundSize = "16px 16px";
        };
        /**
         * Destroys the button object
         *
         * @param {string} id
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.destroyButton = function (id) {
            var button = $("#" + id).data("ejButton");
            if (button != undefined) {
                button.destroy();
            }
        };
        /**
         * Creates the trace state field (currently a special button is used)
         *
         * @param {string} id
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.createField = function (id) {
            $("#" + id).ejButton({
                text: "0",
                contentType: ej.ContentType.TextOnly,
                cssClass: "traceStateButton",
            });
            var fieldElement = $("#" + id)[0];
            if (fieldElement != undefined) {
                fieldElement.style.color = "#FFFFFF";
            }
        };
        /**
         * Destroys the field object
         *
         * @param {string} id
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.destroyField = function (id) {
            var field = $("#" + id).data("ejButton");
            if (field != undefined) {
                field.destroy();
            }
        };
        /**
         * Resizes the trace control widget
         *
         * @param {number} width
         * @param {number} height
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.resize = function (width, height) {
            this._actualHeight = height;
            this._actualWidth = width;
            $(this.cssParentContentId)[0].style.width = width.toString() + "px";
            $(this.cssParentContentId)[0].style.height = height.toString() + "px";
            this.updateDynamicLayout();
        };
        /**
         * Updates the dynamic layout (e.g. smaller buttons if small widget size)
         *
         * @private
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.updateDynamicLayout = function () {
            var neededSizeForDefaultLayout = 1400;
            var neededSizeForMinimzedLayoutStep1 = 1000;
            if (this._actualWidth > neededSizeForDefaultLayout) {
                this.setLayout(LayoutStyle.Default);
            }
            else if (this._actualWidth > neededSizeForMinimzedLayoutStep1) {
                this.setLayout(LayoutStyle.MinimizeStep1);
            }
            else {
                this.setLayout(LayoutStyle.MinimizeStep2);
            }
        };
        /**
         * Sets the dynamic layout to a defined layout style (e.g. default or minimized)
         *
         * @private
         * @param {LayoutStyle} layoutStyle
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.setLayout = function (layoutStyle) {
            switch (layoutStyle) {
                case LayoutStyle.MinimizeStep2: {
                    this.setButtonLayout(this._saveTraceConfigurationButtonId, "", this._defaultButtonWidth3MinimizedStep2, this.getLeftPosition(0, LayoutStyle.MinimizeStep2) + "px");
                    this.setButtonLayout(this._importTraceConfigurationButtonId, "", this._defaultButtonWidth3MinimizedStep2, this.getLeftPosition(1, LayoutStyle.MinimizeStep2) + "px");
                    this.setButtonLayout(this._exportTraceConfigurationButtonId, "", this._defaultButtonWidth3MinimizedStep2, this.getLeftPosition(2, LayoutStyle.MinimizeStep2) + "px");
                    break;
                }
                case LayoutStyle.MinimizeStep1: {
                    this.setButtonLayout(this._saveTraceConfigurationButtonId, ButtonTexts.SaveTraceConfigurationMinimized, this._defaultButtonWidth3MinimizedStep1, this.getLeftPosition(0, LayoutStyle.MinimizeStep1) + "px");
                    this.setButtonLayout(this._importTraceConfigurationButtonId, ButtonTexts.ImportTraceConfigurationMinimized, this._defaultButtonWidth3MinimizedStep1, this.getLeftPosition(1, LayoutStyle.MinimizeStep1) + "px");
                    this.setButtonLayout(this._exportTraceConfigurationButtonId, ButtonTexts.ExportTraceConfigurationMinimized, this._defaultButtonWidth3MinimizedStep1, this.getLeftPosition(2, LayoutStyle.MinimizeStep1) + "px");
                    break;
                }
                case LayoutStyle.Default: {
                    this.setButtonLayout(this._saveTraceConfigurationButtonId, ButtonTexts.SaveTraceConfiguration, this._defaultButtonWidth3, this.getLeftPosition(0) + "px");
                    this.setButtonLayout(this._importTraceConfigurationButtonId, ButtonTexts.ImportTraceConfiguration, this._defaultButtonWidth3, this.getLeftPosition(1) + "px");
                    this.setButtonLayout(this._exportTraceConfigurationButtonId, ButtonTexts.ExportTraceConfiguration, this._defaultButtonWidth3, this.getLeftPosition(2) + "px");
                    break;
                }
            }
        };
        Object.defineProperty(TraceControlWidget.prototype, "traceControlInterface", {
            /**
             * Sets and defines the interface to the trace control
             *
             * @memberof TraceControlWidget
             */
            set: function (traceComponentControl) {
                this._traceControlInterface = traceComponentControl;
                if (this._traceControlInterface) {
                    this.addDynamicButtonsForAvailableCommands(this._traceControlInterface);
                    this.addTraceState(this._traceControlInterface);
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Add trace state info to layout
         *
         * @private
         * @param {*} traceControlInterface
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.addTraceState = function (traceControlInterface) {
            var _this = this;
            this.createField(this._stateFieldId);
            // listen to changed events of trace state
            traceControlInterface.traceState.changed(function (traceStateParameter) {
                _this._actualTraceState = traceStateParameter.value;
                _this.refreshTraceControlParameterValue(traceStateParameter);
            });
        };
        /**
         * Adds the dynamic buttons (save/import/export trace configuation) if command is available in command interface
         *
         * @private
         * @param {*} commands
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.addDynamicButtonsForAvailableCommands = function (commands) {
            if (commands.commandSaveConfiguration) {
                this.createButton(this._saveTraceConfigurationButtonId, ButtonTexts.SaveTraceConfiguration, this.getImagePath("save.svg"), this._defaultButtonWidth3);
            }
            if (commands.commandImportTraceConfiguration) {
                this.createButton(this._importTraceConfigurationButtonId, ButtonTexts.ImportTraceConfiguration, this.getImagePath("import.svg"), this._defaultButtonWidth3);
            }
            if (commands.commandExportTraceConfiguration) {
                this.createButton(this._exportTraceConfigurationButtonId, ButtonTexts.ExportTraceConfiguration, this.getImagePath("export.svg"), this._defaultButtonWidth3);
            }
            // Update layout after adding new buttons
            this.updateDynamicLayout();
        };
        /**
         * Will be called when a button was clicked
         *
         * @private
         * @param {*} buttonId
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.click = function (buttonId) {
            switch (buttonId) {
                case this._activateButtonId:
                    this.executeActivate();
                    break;
                case this._forceStartButtonId:
                    this.executeForceStart();
                    break;
                case this._forceStopButtonId:
                    this.executeForceStop();
                    break;
                case this._saveTraceConfigurationButtonId:
                    this.executeSaveConfiguration();
                    break;
                case this._importTraceConfigurationButtonId:
                    this.importTraceConfiguration();
                    break;
                case this._exportTraceConfigurationButtonId:
                    this.exportTraceConfiguration();
                    break;
            }
        };
        /**
         * Activates the trace
         *
         * @private
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.executeActivate = function () {
            var _this = this;
            if (this._traceControlInterface) {
                if (this._saveConfigIsActive == false) {
                    this._activateIsActive = true;
                    this.setButtonStates(this._traceControlInterface.traceState.value);
                    this._traceControlInterface.commandActivate.execute(null, function (result) {
                        _this._activateIsActive = false;
                        _this.setButtonStates(_this._traceControlInterface.traceState.value);
                    });
                }
            }
        };
        /**
         * Forces starting the trace
         *
         * @private
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.executeForceStart = function () {
            if (this._traceControlInterface) {
                if (this._actualTraceState == traceConfigDefines_1.TraceStateIds.Wait_start_trigger) {
                    this._traceControlInterface.commandForceStart.execute();
                }
            }
        };
        /**
         * Forces stopping the trace
         *
         * @private
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.executeForceStop = function () {
            if (this._traceControlInterface) {
                if (this._actualTraceState == traceConfigDefines_1.TraceStateIds.Wait_stop_event) { // Only while running
                    this._traceControlInterface.commandForceStop.execute();
                }
            }
        };
        /**
         * Saves the trace configuration on target
         *
         * @private
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.executeSaveConfiguration = function () {
            var _this = this;
            if (this._traceControlInterface) {
                if (this.saveTraceConfigPossibleInThisState(this._actualTraceState)) {
                    this._saveConfigIsActive = true;
                    this.setButtonStates(this._traceControlInterface.traceState.value);
                    this._traceControlInterface.commandSaveConfiguration.execute(null, function (result) {
                        _this._saveConfigIsActive = false;
                        _this.setButtonStates(_this._traceControlInterface.traceState.value);
                    });
                }
            }
        };
        /**
         * Opens a file select dialog and imports a trace configuration from the file
         *
         * @private
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.importTraceConfiguration = function () {
            this._fileProvider.eventUploadDataFinished.attach(this._uploadDataFinishedHandler);
            this._fileProvider.uploadData(".tracecfg"); // Only show/accept *.tracecfg files
        };
        /**
         * Export a trace configuration to a file
         *
         * @private
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.exportTraceConfiguration = function () {
            this._traceControlInterface.commandExportTraceConfiguration.execute(null, function (result) {
                var blob = new Blob([result], { type: "text/xml" });
                fileProvider_1.FileProvider.downloadData("TraceConfi.tracecfg", blob);
            });
        };
        /**
         * Occurs after reading data from file(trace configuration import data)
         *
         * @private
         * @param {HTMLInputElement} sender
         * @param {Map<string, string>} args
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.onUploadDataFinished = function (sender, args) {
            /*this.setBusyInformation(new BusyInformation("Importing data...", ImageId.defaultImage, 48, true));
            this.setBusy(true);*/
            var _this = this;
            // Timeout needed to show the busyscreen before importing data 
            setTimeout(function () { return _this.importData(sender, args); }, 200);
            this._fileProvider.eventUploadDataFinished.detach(this._uploadDataFinishedHandler);
        };
        /**
         * imports the given filedata with the given filename
         *
         * @private
         * @param {HTMLInputElement} fileInputElement
         * @param {Map<string, string>} fileContents
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.importData = function (fileInputElement, fileContents) {
            if (fileContents.size === 1) {
                var filedata = fileContents.values().next().value;
                this._traceControlInterface.commandImportTraceConfiguration.execute(filedata, function (result) {
                });
            }
        };
        /**
         * refreshes the trace state (displayname of value and the state icon)
         *
         * @private
         * @param {MappCockpitComponentParameter} traceControlParameter
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.refreshTraceControlParameterValue = function (traceControlParameter) {
            var traceState = traceControlParameter.value;
            this.setTraceStateText(traceState);
            this.setTraceStateImage(traceState);
            this.setButtonStates(traceState);
        };
        /**
         * Set the display name for the trace state in the visualization
         *
         * @private
         * @param {string} traceState
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.setTraceStateText = function (traceState) {
            // Get display name for the trace state
            var traceStateDisplayText = "Inactive";
            if (traceState == traceConfigDefines_1.TraceStateIds.Config_processing || traceState == traceConfigDefines_1.TraceStateIds.Config_applied) {
                traceStateDisplayText = "Applying configuration";
            }
            else if (traceState == traceConfigDefines_1.TraceStateIds.Wait_start_trigger) {
                traceStateDisplayText = "Wait for start trigger";
            }
            else if (traceState == traceConfigDefines_1.TraceStateIds.Wait_stop_event) {
                traceStateDisplayText = "Running";
            }
            else if (traceState == traceConfigDefines_1.TraceStateIds.Data_available) {
                traceStateDisplayText = "Data available";
            }
            else if (traceState == traceConfigDefines_1.TraceStateIds.Record_failure) {
                traceStateDisplayText = "Record failed";
            }
            // Set display name for the trace state
            $("#" + this._stateFieldId).ejButton({
                text: traceStateDisplayText,
            });
        };
        /**
         * Sets an image for the trace state in the visualization
         *
         * @private
         * @param {string} traceState
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.setTraceStateImage = function (traceState) {
            // Get image for the trace state
            var imagepath = this.getImagePath("inactive.svg");
            if (traceState == traceConfigDefines_1.TraceStateIds.Wait_start_trigger) {
                imagepath = this.getImagePath("wait_start_trigger.svg");
            }
            else if (traceState == traceConfigDefines_1.TraceStateIds.Wait_stop_event) {
                imagepath = this.getImagePath("wait_stop_event.svg");
            }
            else if (traceState == traceConfigDefines_1.TraceStateIds.Data_available) {
                imagepath = this.getImagePath("data_available.svg");
            }
            // Set image for the trace state
            var imageElement = $("#" + this._stateImage)[0];
            if (imageElement != undefined) {
                imageElement.style.backgroundImage = "url('" + imagepath + "')";
            }
        };
        /**
         * Sets the states(enabled/disabled) of the buttons for the given trace state
         *
         * @private
         * @param {string} traceState
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.setButtonStates = function (traceState) {
            if (traceState == traceConfigDefines_1.TraceStateIds.Wait_start_trigger) {
                this.setButtonStateInWaitStartTriggerState();
            }
            else if (traceState == traceConfigDefines_1.TraceStateIds.Wait_stop_event) {
                this.setButtonStateInWaitStopEventState();
            }
            else {
                if (this.saveTraceConfigPossibleInThisState(traceState)) {
                    this.deactivateButton(this._saveTraceConfigurationButtonId, false);
                }
                // other state => deactivate force start trigger and force stop event
                this.deactivateButton(this._forceStartButtonId, true);
                this.deactivateButton(this._forceStopButtonId, true);
                // set activate button state
                if (this._activateIsActive == false && this._saveConfigIsActive == false) {
                    this.deactivateButton(this._activateButtonId, false);
                }
                else {
                    this.deactivateButton(this._activateButtonId, true);
                }
            }
        };
        /**
         * Sets the button states if the trace state is waiting for start trigger
         *
         * @private
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.setButtonStateInWaitStartTriggerState = function () {
            // Wait for start trigger => activate force start; deactivate force stop event
            this.deactivateButton(this._forceStartButtonId, false);
            this.deactivateButton(this._forceStopButtonId, true);
            this.deactivateButton(this._saveTraceConfigurationButtonId, true);
        };
        /**
         * Sets the button states if the trace state is waiting for the stop event
         *
         * @private
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.setButtonStateInWaitStopEventState = function () {
            // Running => deactivate force start trigger; activate force stop event
            this.deactivateButton(this._forceStartButtonId, true);
            this.deactivateButton(this._forceStopButtonId, false);
            this.deactivateButton(this._saveTraceConfigurationButtonId, true);
        };
        /**
         * Returns the imagePath for the given imageName and state(activated/deactivated)
         *
         * @private
         * @param {string} imageName
         * @param {boolean} [deactivated=false]
         * @returns {string}
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.getImagePath = function (imageName, deactivated) {
            if (deactivated === void 0) { deactivated = false; }
            if (deactivated == true) {
                imageName = imageName.replace(".svg", "_deactivated.svg");
            }
            return themeProvider_1.ThemeProvider.getInstance().getThemedFilePath("widgets/traceControlWidget/style/images/" + imageName);
        };
        /**
         * Return true if saveing of trace configuration is possible in the current trace state
         *
         * @private
         * @param {*} state
         * @returns {boolean}
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.saveTraceConfigPossibleInThisState = function (state) {
            if (state == traceConfigDefines_1.TraceStateIds.Disabled || state == traceConfigDefines_1.TraceStateIds.Data_available || state == traceConfigDefines_1.TraceStateIds.Record_failure) {
                return true;
            }
            return false;
        };
        return TraceControlWidget;
    }(widgetBase_1.WidgetBase));
    exports.TraceControlWidget = TraceControlWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2VDb250cm9sV2lkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL3RyYWNlQ29udHJvbFdpZGdldC90cmFjZUNvbnRyb2xXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQVNBOzs7O09BSUc7SUFDSCxJQUFLLFdBS0o7SUFMRCxXQUFLLFdBQVc7UUFDWixtREFBTyxDQUFBO1FBQ1AsK0RBQWEsQ0FBQTtRQUNiLCtEQUFhLENBQUE7UUFDYiwrREFBYSxDQUFBO0lBQ2pCLENBQUMsRUFMSSxXQUFXLEtBQVgsV0FBVyxRQUtmO0lBRUQ7Ozs7T0FJRztJQUNIO1FBQUE7UUFhQSxDQUFDO1FBWkcsdUJBQXVCO1FBQ1Asb0JBQVEsR0FBRyxVQUFVLENBQUM7UUFDdEIsc0JBQVUsR0FBRyxhQUFhLENBQUM7UUFDM0IscUJBQVMsR0FBRyxZQUFZLENBQUM7UUFDekIsa0NBQXNCLEdBQUcsMEJBQTBCLENBQUM7UUFDcEQsb0NBQXdCLEdBQUcsNEJBQTRCLENBQUM7UUFDeEQsb0NBQXdCLEdBQUcsNEJBQTRCLENBQUM7UUFFeEUseUJBQXlCO1FBQ1QsMkNBQStCLEdBQUcsTUFBTSxDQUFDO1FBQ3pDLDZDQUFpQyxHQUFHLFFBQVEsQ0FBQztRQUM3Qyw2Q0FBaUMsR0FBRyxRQUFRLENBQUM7UUFDakUsa0JBQUM7S0FBQSxBQWJELElBYUM7SUFFRDs7Ozs7T0FLRztJQUNIO1FBQWlDLHNDQUFVO1FBQTNDO1lBQUEscUVBMHpCQztZQWh6QlcsdUJBQWlCLEdBQUcsa0NBQWEsQ0FBQyxRQUFRLENBQUM7WUFFM0MseUJBQW1CLEdBQUcsS0FBSyxDQUFDO1lBQzVCLHVCQUFpQixHQUFHLEtBQUssQ0FBQztZQUkxQixtQkFBYSxHQUFHLElBQUksMkJBQVksRUFBRSxDQUFDO1lBRW5DLGdDQUEwQixHQUFHLFVBQUMsTUFBTSxFQUFDLElBQUksSUFBRyxPQUFBLEtB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QVUsR0EwekIxQztJQUVRLGdEQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFdpZGdldEJhc2UgfSBmcm9tIFwiLi4vY29tbW9uL3dpZGdldEJhc2VcIjtcclxuaW1wb3J0IHsgSVRyYWNlQ29udHJvbFdpZGdldCB9IGZyb20gXCIuL2ludGVyZmFjZXMvdHJhY2VDb250cm9sV2lkZ2V0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyIH0gZnJvbSBcIi4uLy4uL21vZGVscy9vbmxpbmUvbWFwcENvY2twaXRDb21wb25lbnRcIjtcclxuaW1wb3J0IHsgSVRyYWNlQ29tcG9uZW50Q29udHJvbCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvZGlhZ25vc3RpY3MvdHJhY2UvaW50ZXJmYWNlcy90cmFjZUNvbnRyb2xQcm92aWRlckludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBEb21IZWxwZXIgfSBmcm9tIFwiLi4vY29tbW9uL2RvbUhlbHBlclwiO1xyXG5pbXBvcnQgeyBUaGVtZVByb3ZpZGVyIH0gZnJvbSBcIi4uL2NvbW1vbi90aGVtZVByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IEZpbGVQcm92aWRlciB9IGZyb20gXCIuLi8uLi9jb21tb24vZmlsZVByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IFRyYWNlU3RhdGVJZHMgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2RpYWdub3N0aWNzL3RyYWNlL3RyYWNlQ29uZmlnL3RyYWNlQ29uZmlnRGVmaW5lc1wiO1xyXG5cclxuLyoqXHJcbiAqIExheW91dCBzdHlsZXMgZm9yIGR5bmFtaWMgbGF5b3V0XHJcbiAqXHJcbiAqIEBlbnVtIHtudW1iZXJ9XHJcbiAqL1xyXG5lbnVtIExheW91dFN0eWxle1xyXG4gICAgRGVmYXVsdCxcclxuICAgIE1pbmltaXplU3RlcDEsXHJcbiAgICBNaW5pbWl6ZVN0ZXAyLFxyXG4gICAgTWluaW1pemVTdGVwMyxcclxufVxyXG5cclxuLyoqXHJcbiAqIFRoZSB0ZXh0cyBmb3IgdGhlIGJ1dHRvbnNcclxuICpcclxuICogQGNsYXNzIEJ1dHRvblRleHRzXHJcbiAqL1xyXG5jbGFzcyBCdXR0b25UZXh0c3tcclxuICAgIC8vIERlZmF1bHQgYnV0dG9uIHRleHRzXHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgQWN0aXZhdGUgPSBcIkFjdGl2YXRlXCI7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgRm9yY2VTdGFydCA9IFwiRm9yY2Ugc3RhcnRcIjtcclxuICAgIHN0YXRpYyByZWFkb25seSBGb3JjZVN0b3AgPSBcIkZvcmNlIHN0b3BcIjtcclxuICAgIHN0YXRpYyByZWFkb25seSBTYXZlVHJhY2VDb25maWd1cmF0aW9uID0gXCJTYXZlIHRyYWNlIGNvbmZpZ3VyYXRpb25cIjtcclxuICAgIHN0YXRpYyByZWFkb25seSBJbXBvcnRUcmFjZUNvbmZpZ3VyYXRpb24gPSBcIkltcG9ydCB0cmFjZSBjb25maWd1cmF0aW9uXCI7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgRXhwb3J0VHJhY2VDb25maWd1cmF0aW9uID0gXCJFeHBvcnQgdHJhY2UgY29uZmlndXJhdGlvblwiO1xyXG5cclxuICAgIC8vIE1pbmltaXplZCBidXR0b24gdGV4dHNcclxuICAgIHN0YXRpYyByZWFkb25seSBTYXZlVHJhY2VDb25maWd1cmF0aW9uTWluaW1pemVkID0gXCJTYXZlXCI7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgSW1wb3J0VHJhY2VDb25maWd1cmF0aW9uTWluaW1pemVkID0gXCJJbXBvcnRcIjtcclxuICAgIHN0YXRpYyByZWFkb25seSBFeHBvcnRUcmFjZUNvbmZpZ3VyYXRpb25NaW5pbWl6ZWQgPSBcIkV4cG9ydFwiO1xyXG59XHJcblxyXG4vKipcclxuICogaW1wbGVtZW50cyB0aGUgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAqXHJcbiAqIEBjbGFzcyBUcmFjZUNvbnRyb2xXaWRnZXRcclxuICogQGV4dGVuZHMge1dpZGdldEJhc2V9XHJcbiAqL1xyXG5jbGFzcyBUcmFjZUNvbnRyb2xXaWRnZXQgZXh0ZW5kcyBXaWRnZXRCYXNlIGltcGxlbWVudHMgSVRyYWNlQ29udHJvbFdpZGdldCB7XHJcbiAgICBwcml2YXRlIF9zdGF0ZUZpZWxkSWQ7XHJcbiAgICBwcml2YXRlIF9zdGF0ZUltYWdlO1xyXG5cclxuICAgIHByaXZhdGUgX2FjdGl2YXRlQnV0dG9uSWQ7XHJcbiAgICBwcml2YXRlIF9mb3JjZVN0YXJ0QnV0dG9uSWQ7XHJcbiAgICBwcml2YXRlIF9mb3JjZVN0b3BCdXR0b25JZDtcclxuICAgIHByaXZhdGUgX3NhdmVUcmFjZUNvbmZpZ3VyYXRpb25CdXR0b25JZDtcclxuICAgIHByaXZhdGUgX2ltcG9ydFRyYWNlQ29uZmlndXJhdGlvbkJ1dHRvbklkO1xyXG4gICAgcHJpdmF0ZSBfZXhwb3J0VHJhY2VDb25maWd1cmF0aW9uQnV0dG9uSWQ7XHJcbiAgICBwcml2YXRlIF9hY3R1YWxUcmFjZVN0YXRlID0gVHJhY2VTdGF0ZUlkcy5EaXNhYmxlZDtcclxuXHJcbiAgICBwcml2YXRlIF9zYXZlQ29uZmlnSXNBY3RpdmUgPSBmYWxzZTtcclxuICAgIHByaXZhdGUgX2FjdGl2YXRlSXNBY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICBwcml2YXRlIF90cmFjZUNvbnRyb2xJbnRlcmZhY2U6IElUcmFjZUNvbXBvbmVudENvbnRyb2x8dW5kZWZpbmVkO1xyXG5cdFx0XHJcbiAgICBwcml2YXRlIF9maWxlUHJvdmlkZXIgPSBuZXcgRmlsZVByb3ZpZGVyKCk7XHJcbiAgICBcclxuICAgIHByaXZhdGUgX3VwbG9hZERhdGFGaW5pc2hlZEhhbmRsZXIgPSAoc2VuZGVyLGFyZ3MpPT50aGlzLm9uVXBsb2FkRGF0YUZpbmlzaGVkKHNlbmRlcixhcmdzKTtcclxuICAgICAgICBcclxuICAgIC8qKlxyXG4gICAgICogRGVmYXVsdCBidXR0b24gd2lkdGggZm9yIGFjdGl2ZSBidXR0b25cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9kZWZhdWx0QnV0dG9uV2lkdGgxID0gXCI4NXB4XCI7XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogRGVmYXVsdCBidXR0b24gd2lkdGggZm9yIGZvcmNlIHN0YXJ0L3N0b3AgYnV0dG9uXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfZGVmYXVsdEJ1dHRvbldpZHRoMiA9IFwiMTAwcHhcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmF1bHQgYnV0dG9uIHdpZHRoIGZvciBzYXZlL2ltcG9ydC9leHBvcnQgdHJhY2UgY29uZmlnIGJ1dHRvbnNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9kZWZhdWx0QnV0dG9uV2lkdGgzID0gXCIxOTVweFwiO1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIE1pbmltaXplZCBTdGVwIDEgYnV0dG9uIHdpZHRoIGZvciBzYXZlL2ltcG9ydC9leHBvcnQgdHJhY2UgY29uZmlnIGJ1dHRvbnNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9kZWZhdWx0QnV0dG9uV2lkdGgzTWluaW1pemVkU3RlcDEgPSBcIjYwcHhcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE1pbmltaXplZCBTdGVwIDIgYnV0dG9uIHdpZHRoIGZvciBzYXZlL2ltcG9ydC9leHBvcnQgdHJhY2UgY29uZmlnIGJ1dHRvbnNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9kZWZhdWx0QnV0dG9uV2lkdGgzTWluaW1pemVkU3RlcDIgPSBcIjE2cHhcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmF1bHQgbGVmdCBwb3NpdGlvbiBvZiB0aGUgc2F2ZS9pbXBvcnQvZXhwb3J0IGJ1dHRvbnNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9sZWZ0UG9zaXRpb25TdGFydCA9IDczMDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmF1bHQgc3BhY2UgYmV0d2VlbiB0aGUgIHNhdmUvaW1wb3J0L2V4cG9ydCBidXR0b25zXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfZGVmYXVsdEJ1dHRvblNwYWNlID0gMzU7XHJcblxyXG4gICBcclxuICAgIC8qKiBpbml0aWFsaXplIHRoZSB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGF5b3V0Q29udGFpbmVySWRcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xXaWRnZXRcclxuICAgICAqL1xyXG4gICAgaW5pdGlhbGl6ZShsYXlvdXRDb250YWluZXJJZDogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIuaW5pdGlhbGl6ZShsYXlvdXRDb250YWluZXJJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEaXNwb3NlIHNvbWUgb2JqZWN0cyBmcm9tIHRoaXMgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gICAgICovXHJcbiAgICBkaXNwb3NlKCl7XHJcbiAgICAgICAgLy8gRGlzcG9zZSBzdGF0aWMgYnV0dG9uIGFuZCBmaWVsZHNcclxuICAgICAgICB0aGlzLmRlc3Ryb3lCdXR0b24odGhpcy5fYWN0aXZhdGVCdXR0b25JZCk7XHJcbiAgICAgICAgdGhpcy5kZXN0cm95RmllbGQodGhpcy5fc3RhdGVGaWVsZElkKTtcclxuICAgICAgICB0aGlzLmRlc3Ryb3lCdXR0b24odGhpcy5fZm9yY2VTdGFydEJ1dHRvbklkKTtcclxuICAgICAgICB0aGlzLmRlc3Ryb3lCdXR0b24odGhpcy5fZm9yY2VTdG9wQnV0dG9uSWQpO1xyXG5cclxuICAgICAgICAvLyBEaXNwb3NlIGR5bmFtaWMgYnV0dG9ucyBpZiBhdmFpbGFibGVcclxuICAgICAgICB0aGlzLmRlc3Ryb3lCdXR0b24odGhpcy5fc2F2ZVRyYWNlQ29uZmlndXJhdGlvbkJ1dHRvbklkKTtcclxuICAgICAgICB0aGlzLmRlc3Ryb3lCdXR0b24odGhpcy5faW1wb3J0VHJhY2VDb25maWd1cmF0aW9uQnV0dG9uSWQpO1xyXG4gICAgICAgIHRoaXMuZGVzdHJveUJ1dHRvbih0aGlzLl9leHBvcnRUcmFjZUNvbmZpZ3VyYXRpb25CdXR0b25JZClcclxuXHJcbiAgICAgICAgc3VwZXIuZGlzcG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgd2lkZ2V0IGNvbnRlbnQgYW5kIGV2ZW50dWFsbHkgc3Vid2lkZ2V0c1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xXaWRnZXRcclxuICAgICAqL1xyXG4gICAgY3JlYXRlV2lkZ2V0cygpIHtcclxuICAgICAgICB0aGlzLmluaXRCdXR0b25BbmRGaWVsZElkcygpO1xyXG5cclxuICAgICAgICB0aGlzLmNyZWF0ZURpdkJ1dHRvbnNBbmRGaWVsZHNMYXlvdXQoKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmFkZFN0YXRpY0J1dHRvbnMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEluaXRpYWxpemVzIHRoZSBpZHMgZm9yIHRoZSBidXR0b25zIGFuZCBmaWVsZHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGluaXRCdXR0b25BbmRGaWVsZElkcygpe1xyXG4gICAgICAgIGxldCBsYXlvdXRDb250YWluZXJJZCA9IHRoaXMucGFyZW50Q29udGVudElkO1xyXG4gICAgICAgIHRoaXMuX2FjdGl2YXRlQnV0dG9uSWQgPSBsYXlvdXRDb250YWluZXJJZCArIFwiX2FjdGl2YXRlQnV0dG9uXCI7XHJcbiAgICAgICAgdGhpcy5fZm9yY2VTdGFydEJ1dHRvbklkID0gbGF5b3V0Q29udGFpbmVySWQgKyBcIl9mb3JjZVN0YXJ0QnV0dG9uXCI7XHJcbiAgICAgICAgdGhpcy5fZm9yY2VTdG9wQnV0dG9uSWQgPSBsYXlvdXRDb250YWluZXJJZCArIFwiX2ZvcmNlU3RvcEJ1dHRvblwiO1xyXG4gICAgICAgIHRoaXMuX3NhdmVUcmFjZUNvbmZpZ3VyYXRpb25CdXR0b25JZCA9IGxheW91dENvbnRhaW5lcklkICsgXCJfc2F2ZVRyYWNlQ29uZmlndXJhdGlvbkJ1dHRvblwiO1xyXG4gICAgICAgIHRoaXMuX2ltcG9ydFRyYWNlQ29uZmlndXJhdGlvbkJ1dHRvbklkID0gbGF5b3V0Q29udGFpbmVySWQgKyBcIl9pbXBvcnRUcmFjZUNvbmZpZ3VyYXRpb25CdXR0b25cIjtcclxuICAgICAgICB0aGlzLl9leHBvcnRUcmFjZUNvbmZpZ3VyYXRpb25CdXR0b25JZCA9IGxheW91dENvbnRhaW5lcklkICsgXCJfZXhwb3J0VHJhY2VDb25maWd1cmF0aW9uQnV0dG9uXCI7XHJcbiAgICAgICAgdGhpcy5fc3RhdGVGaWVsZElkID0gbGF5b3V0Q29udGFpbmVySWQgKyBcInRyYWNlY29udHJvbF9zdGF0ZVwiO1xyXG4gICAgICAgIHRoaXMuX3N0YXRlSW1hZ2UgPSBsYXlvdXRDb250YWluZXJJZCArIFwidHJhY2Vjb250cm9sX3N0YXRlX2ltYWdlXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHRoZSBsYXlvdXQgZm9yIHRoZSBidXR0b25zIGFuZCBmaWVsZHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0ZURpdkJ1dHRvbnNBbmRGaWVsZHNMYXlvdXQoKXtcclxuICAgICAgICBsZXQgZWxlbWVudCA9ICQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpO1xyXG4gICAgICAgIGVsZW1lbnRbMF0uc3R5bGUucGFkZGluZ1RvcCA9IFwiNHB4XCI7XHJcbiAgICAgICAgZWxlbWVudFswXS5zdHlsZS5iYWNrZ3JvdW5kID0gXCJ2YXIoLS1tYWluLWdyZXktZGFyazIpXCI7XHJcbiAgICAgICAgZWxlbWVudFswXS5zdHlsZS5vdmVyZmxvdyA9IFwiaGlkZGVuXCI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZWxlbWVudC5hcHBlbmQoXCI8ZGl2IHN0eWxlPSdsZWZ0OiAyNXB4OyBwb3NpdGlvbjogYWJzb2x1dGU7JyBpZD0nXCIrIHRoaXMuX2FjdGl2YXRlQnV0dG9uSWQgK1wiJz48L2Rpdj5cIik7XHJcbiAgICAgICAgZWxlbWVudC5hcHBlbmQoXCI8ZGl2IHN0eWxlPSd0b3A6IDEwcHg7IGxlZnQ6IDE1MHB4OyBwb3NpdGlvbjogYWJzb2x1dGU7JyBjbGFzcz0ndHJhY2VDb250cm9sU3RhdGVJbWFnZScgaWQ9J1wiKyB0aGlzLl9zdGF0ZUltYWdlICtcIic+PC9kaXY+XCIpO1xyXG4gICAgICAgIGVsZW1lbnQuYXBwZW5kKFwiPGRpdiBzdHlsZT0ndG9wOiAxMHB4OyBsZWZ0OiAxODBweDsgcG9zaXRpb246IGFic29sdXRlOycgaWQ9J1wiKyB0aGlzLl9zdGF0ZUZpZWxkSWQgK1wiJz48L2Rpdj5cIik7XHJcbiAgICAgICAgZWxlbWVudC5hcHBlbmQoXCI8ZGl2IHN0eWxlPSdsZWZ0OiAzNDBweDsgcG9zaXRpb246IGFic29sdXRlOycgaWQ9J1wiKyB0aGlzLl9mb3JjZVN0YXJ0QnV0dG9uSWQgK1wiJz48L2Rpdj5cIik7XHJcbiAgICAgICAgZWxlbWVudC5hcHBlbmQoXCI8ZGl2IHN0eWxlPSdsZWZ0OiA0NzVweDsgcG9zaXRpb246IGFic29sdXRlOycgaWQ9J1wiKyB0aGlzLl9mb3JjZVN0b3BCdXR0b25JZCArXCInPjwvZGl2PlwiKTtcclxuICAgICAgICBlbGVtZW50LmFwcGVuZChcIjxkaXYgc3R5bGU9J2xlZnQ6IFwiICsgdGhpcy5nZXRMZWZ0UG9zaXRpb24oMCkgKyBcInB4OyBwb3NpdGlvbjogYWJzb2x1dGU7JyBpZD0nXCIrIHRoaXMuX3NhdmVUcmFjZUNvbmZpZ3VyYXRpb25CdXR0b25JZCArXCInPjwvZGl2PlwiKTtcclxuICAgICAgICBlbGVtZW50LmFwcGVuZChcIjxkaXYgc3R5bGU9J2xlZnQ6IFwiICsgdGhpcy5nZXRMZWZ0UG9zaXRpb24oMSkgKyBcInB4OyBwb3NpdGlvbjogYWJzb2x1dGU7JyBpZD0nXCIrIHRoaXMuX2ltcG9ydFRyYWNlQ29uZmlndXJhdGlvbkJ1dHRvbklkICtcIic+PC9kaXY+XCIpO1xyXG4gICAgICAgIGVsZW1lbnQuYXBwZW5kKFwiPGRpdiBzdHlsZT0nbGVmdDogXCIgKyB0aGlzLmdldExlZnRQb3NpdGlvbigyKSArIFwicHg7IHBvc2l0aW9uOiBhYnNvbHV0ZTsnIGlkPSdcIisgdGhpcy5fZXhwb3J0VHJhY2VDb25maWd1cmF0aW9uQnV0dG9uSWQgK1wiJz48L2Rpdj5cIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBsZWZ0IHBvc2l0aW9uIG9mIGEgYnV0dG9uIGZvciB0aGUgZ2l2ZW4gTGF5b3V0U3R5bGVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4XHJcbiAgICAgKiBAcGFyYW0ge0xheW91dFN0eWxlfSBbbGF5b3V0U3R5bGU9TGF5b3V0U3R5bGUuRGVmYXVsdF1cclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0TGVmdFBvc2l0aW9uKGluZGV4OiBudW1iZXIsIGxheW91dFN0eWxlOiBMYXlvdXRTdHlsZSA9IExheW91dFN0eWxlLkRlZmF1bHQpOiBudW1iZXJ7XHJcbiAgICAgICAgaWYoaW5kZXggPT0gMCl7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9sZWZ0UG9zaXRpb25TdGFydDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgbGV0IGRlZmF1bHRCdXR0b25XaWR0aCA9IHRoaXMuX2RlZmF1bHRCdXR0b25XaWR0aDM7XHJcbiAgICAgICAgICAgIGlmKGxheW91dFN0eWxlID09IExheW91dFN0eWxlLk1pbmltaXplU3RlcDEpe1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdEJ1dHRvbldpZHRoID0gdGhpcy5fZGVmYXVsdEJ1dHRvbldpZHRoM01pbmltaXplZFN0ZXAxO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZihsYXlvdXRTdHlsZSA9PSBMYXlvdXRTdHlsZS5NaW5pbWl6ZVN0ZXAyKXtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHRCdXR0b25XaWR0aCA9IHRoaXMuX2RlZmF1bHRCdXR0b25XaWR0aDNNaW5pbWl6ZWRTdGVwMjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgYnV0dG9uV2lkdGggPSBwYXJzZUludChkZWZhdWx0QnV0dG9uV2lkdGgsIDEwKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xlZnRQb3NpdGlvblN0YXJ0ICsgKGluZGV4ICogKGJ1dHRvbldpZHRoICsgdGhpcy5fZGVmYXVsdEJ1dHRvblNwYWNlKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgYnV0dG9ucyBhbmQgZmllbGRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGRTdGF0aWNCdXR0b25zKCl7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVCdXR0b24odGhpcy5fYWN0aXZhdGVCdXR0b25JZCwgQnV0dG9uVGV4dHMuQWN0aXZhdGUsICB0aGlzLmdldEltYWdlUGF0aChcInBsYXkuc3ZnXCIpLCB0aGlzLl9kZWZhdWx0QnV0dG9uV2lkdGgxKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZUZpZWxkKHRoaXMuX3N0YXRlRmllbGRJZCk7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVCdXR0b24odGhpcy5fZm9yY2VTdGFydEJ1dHRvbklkLCBCdXR0b25UZXh0cy5Gb3JjZVN0YXJ0LCAgdGhpcy5nZXRJbWFnZVBhdGgoXCJyZWNvcmQuc3ZnXCIpLCB0aGlzLl9kZWZhdWx0QnV0dG9uV2lkdGgyKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZUJ1dHRvbih0aGlzLl9mb3JjZVN0b3BCdXR0b25JZCwgQnV0dG9uVGV4dHMuRm9yY2VTdG9wLCAgdGhpcy5nZXRJbWFnZVBhdGgoXCJzdG9wLnN2Z1wiKSwgdGhpcy5fZGVmYXVsdEJ1dHRvbldpZHRoMik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkcyB0aGUgc3R5bGVzIGZvciB0aGUgdHJhY2UgY29udHJvbCB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGxvYWRTdHlsZXMoKXtcclxuICAgICAgICBzdXBlci5hZGRTdHlsZShcIndpZGdldHMvdHJhY2VDb250cm9sV2lkZ2V0L3N0eWxlL2Nzcy90cmFjZUNvbnRyb2xTdHlsZS5jc3NcIik7XHJcbiAgICAgICAgc3VwZXIuYWRkU3R5bGUoXCJ3aWRnZXRzL3RyYWNlQ29udHJvbFdpZGdldC9zdHlsZS9jc3MvdHJhY2VDb250cm9sQnV0dG9uU3R5bGUuY3NzXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWN0aXZhdGVzL0RlYWN0aXZhdGVzIGEgYnV0dG9uXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBkZWFjdGl2YXRlXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGRlYWN0aXZhdGVCdXR0b24oaWQ6IHN0cmluZywgZGVhY3RpdmF0ZTogYm9vbGVhbil7XHJcbiAgICAgICAgdmFyIGVqQnV0dG9uID0gJChcIiNcIisgaWQpLmRhdGEoXCJlakJ1dHRvblwiKTtcclxuICAgICAgICBpZihlakJ1dHRvbiA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICB0aGlzLnNldEJ1dHRvbkNzc0NsYXNzKGVqQnV0dG9uLCBkZWFjdGl2YXRlKTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgYnV0dG9uRWxlbWVudCA9ICQoXCIjXCIgKyBpZClbMF07XHJcblxyXG4gICAgICAgIGxldCBpbWFnZVBhdGggPSB0aGlzLmdldEltYWdlUGF0aEZvcklkKGlkLCBkZWFjdGl2YXRlKTtcclxuICAgICAgICBidXR0b25FbGVtZW50LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IFwidXJsKCdcIiArIGltYWdlUGF0aCArXCInKVwiO1xyXG5cclxuICAgICAgICBEb21IZWxwZXIuZGlzYWJsZUVsZW1lbnQoYnV0dG9uRWxlbWVudCwgZGVhY3RpdmF0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBsYXlvdXQgb2YgdGhlIGJ1dHRvbihlLmcuIHRleHQsIHNpemUsIGxlZnQgcG9zdGlvbilcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYnV0dG9uVGV4dFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5ld1NpemVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuZXdMZWZ0UG9zaXRpb25cclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0QnV0dG9uTGF5b3V0KGlkOiBzdHJpbmcsIGJ1dHRvblRleHQ6IHN0cmluZywgbmV3U2l6ZTogc3RyaW5nLCBuZXdMZWZ0UG9zaXRpb246IHN0cmluZyl7XHJcbiAgICAgICAgdmFyIGVqQnV0dG9uID0gJChcIiNcIisgaWQpLmRhdGEoXCJlakJ1dHRvblwiKTtcclxuICAgICAgICBpZihlakJ1dHRvbiA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVqQnV0dG9uLm9wdGlvbihcInRleHRcIiwgYnV0dG9uVGV4dCwgdHJ1ZSk7XHJcbiAgICAgICAgaWYoYnV0dG9uVGV4dCA9PSBcIlwiKXtcclxuICAgICAgICAgICAgZWpCdXR0b24ub3B0aW9uKFwiY29udGVudFR5cGVcIiwgZWouQ29udGVudFR5cGUuSW1hZ2VPbmx5LCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgZWpCdXR0b24ub3B0aW9uKFwiY29udGVudFR5cGVcIiwgZWouQ29udGVudFR5cGUuVGV4dEFuZEltYWdlLCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWpCdXR0b24ub3B0aW9uKFwid2lkdGhcIiwgbmV3U2l6ZSwgdHJ1ZSk7XHJcblxyXG4gICAgICAgIGxldCBidXR0b25FbGVtZW50ID0gJChcIiNcIiArIGlkKVswXTtcclxuICAgICAgICBpZihidXR0b25FbGVtZW50ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGJ1dHRvbkVsZW1lbnQuc3R5bGUubGVmdCA9IG5ld0xlZnRQb3NpdGlvblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGltYWdlcGF0aCBmb3IgdGhlIGJ1dHRvbiBpZHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGJ1dHRvbklkXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGRlYWN0aXZhdGVcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0SW1hZ2VQYXRoRm9ySWQoYnV0dG9uSWQ6IHN0cmluZywgZGVhY3RpdmF0ZTogYm9vbGVhbik6IHN0cmluZ3tcclxuICAgICAgICBsZXQgaW1hZ2VQYXRoO1xyXG4gICAgICAgIGlmKGJ1dHRvbklkID09IHRoaXMuX2ZvcmNlU3RhcnRCdXR0b25JZCl7XHJcbiAgICAgICAgICAgIGltYWdlUGF0aCA9IHRoaXMuZ2V0SW1hZ2VQYXRoKFwicmVjb3JkLnN2Z1wiLCBkZWFjdGl2YXRlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihidXR0b25JZCA9PSB0aGlzLl9mb3JjZVN0b3BCdXR0b25JZCl7XHJcbiAgICAgICAgICAgIGltYWdlUGF0aCA9IHRoaXMuZ2V0SW1hZ2VQYXRoKFwic3RvcC5zdmdcIiwgZGVhY3RpdmF0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoYnV0dG9uSWQgPT0gdGhpcy5fc2F2ZVRyYWNlQ29uZmlndXJhdGlvbkJ1dHRvbklkKXtcclxuICAgICAgICAgICAgaW1hZ2VQYXRoID0gdGhpcy5nZXRJbWFnZVBhdGgoXCJzYXZlLnN2Z1wiLCBkZWFjdGl2YXRlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihidXR0b25JZCA9PSB0aGlzLl9hY3RpdmF0ZUJ1dHRvbklkKXtcclxuICAgICAgICAgICAgaW1hZ2VQYXRoID0gdGhpcy5nZXRJbWFnZVBhdGgoXCJwbGF5LnN2Z1wiLCBkZWFjdGl2YXRlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihidXR0b25JZCA9PSB0aGlzLl9pbXBvcnRUcmFjZUNvbmZpZ3VyYXRpb25CdXR0b25JZCl7XHJcbiAgICAgICAgICAgIGltYWdlUGF0aCA9IHRoaXMuZ2V0SW1hZ2VQYXRoKFwiaW1wb3J0LnN2Z1wiLCBkZWFjdGl2YXRlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihidXR0b25JZCA9PSB0aGlzLl9leHBvcnRUcmFjZUNvbmZpZ3VyYXRpb25CdXR0b25JZCl7XHJcbiAgICAgICAgICAgIGltYWdlUGF0aCA9IHRoaXMuZ2V0SW1hZ2VQYXRoKFwiZXhwb3J0LnN2Z1wiLCBkZWFjdGl2YXRlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGltYWdlUGF0aDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIEJ1dHRvbiBjc3Mgc3R5bGVzIGZvciBhY3RpdmF0ZWQgb3IgZGVhY3RpdmF0ZWQgc3RhdGVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBlakJ1dHRvblxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBkZWFjdGl2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0QnV0dG9uQ3NzQ2xhc3MoZWpCdXR0b24sIGRlYWN0aXZhdGU6IGJvb2xlYW4pe1xyXG4gICAgICAgIGlmKGRlYWN0aXZhdGUgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgIGVqQnV0dG9uLm9wdGlvbihcImNzc0NsYXNzXCIsIFwidHJhY2VDb250cm9sQnV0dG9uRGVhY3RpdmF0ZWRcIiwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGVqQnV0dG9uLm9wdGlvbihcImNzc0NsYXNzXCIsIFwidHJhY2VDb250cm9sQnV0dG9uXCIsIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBidXR0b24gd2l0aCB0aGUgZ2l2ZW4gdGV4dCBhbmQgaW1hZ2VcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaW1hZ2VQYXRoXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlQnV0dG9uKGlkOiBzdHJpbmcsIHRleHQ6IHN0cmluZywgaW1hZ2VQYXRoOiBzdHJpbmcsIHdpZHRoKXtcclxuICAgICAgICAoPGFueT4kKFwiI1wiICsgaWQpKS5lakJ1dHRvbih7XHJcbiAgICAgICAgICAgIHRleHQ6IHRleHQsXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBlai5Db250ZW50VHlwZS5UZXh0QW5kSW1hZ2UsXHJcbiAgICAgICAgICAgIGNzc0NsYXNzOiBcInRyYWNlQ29udHJvbEJ1dHRvblwiLFxyXG4gICAgICAgICAgICBwcmVmaXhJY29uOiBcImUtaWNvblwiLCAvL1NwZWNpZmllcyB0aGUgcHJpbWFyeSBpY29uIGZvciBCdXR0b25cclxuICAgICAgICAgICAgY2xpY2s6IChjbGlja0FyZ3MpID0+IHRoaXMuY2xpY2soaWQpLFxyXG4gICAgICAgICAgICB3aWR0aDogd2lkdGgsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCBidXR0b25FbGVtZW50ID0gJChcIiNcIiArIGlkKVswXTtcclxuICAgICAgICBidXR0b25FbGVtZW50LnN0eWxlLmJhY2tncm91bmRQb3NpdGlvblggPSBcIjRweFwiO1xyXG4gICAgICAgIGJ1dHRvbkVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZFBvc2l0aW9uWSA9IFwiNHB4XCI7XHJcbiAgICAgICAgYnV0dG9uRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcInVybCgnXCIgKyBpbWFnZVBhdGggK1wiJylcIjtcclxuICAgICAgICBidXR0b25FbGVtZW50LnN0eWxlLmJhY2tncm91bmRSZXBlYXQgPSBcIm5vLXJlcGVhdFwiO1xyXG4gICAgICAgIGJ1dHRvbkVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZFNpemUgPSBcIjE2cHggMTZweFwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVzdHJveXMgdGhlIGJ1dHRvbiBvYmplY3RcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBkZXN0cm95QnV0dG9uKGlkOiBzdHJpbmcpe1xyXG4gICAgICAgIGxldCBidXR0b24gPSAkKFwiI1wiICsgaWQpLmRhdGEoXCJlakJ1dHRvblwiKTtcclxuICAgICAgICBpZihidXR0b24gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgYnV0dG9uLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiBcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgdHJhY2Ugc3RhdGUgZmllbGQgKGN1cnJlbnRseSBhIHNwZWNpYWwgYnV0dG9uIGlzIHVzZWQpXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlRmllbGQoaWQ6IHN0cmluZyl7XHJcbiAgICAgICAgKDxhbnk+JChcIiNcIiArIGlkKSkuZWpCdXR0b24oe1xyXG4gICAgICAgICAgICB0ZXh0OiBcIjBcIixcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IGVqLkNvbnRlbnRUeXBlLlRleHRPbmx5LFxyXG4gICAgICAgICAgICBjc3NDbGFzczogXCJ0cmFjZVN0YXRlQnV0dG9uXCIsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCBmaWVsZEVsZW1lbnQgPSAkKFwiI1wiICsgaWQpWzBdO1xyXG4gICAgICAgIGlmKGZpZWxkRWxlbWVudCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBmaWVsZEVsZW1lbnQuc3R5bGUuY29sb3IgPSBcIiNGRkZGRkZcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZXN0cm95cyB0aGUgZmllbGQgb2JqZWN0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZGVzdHJveUZpZWxkKGlkOiBzdHJpbmcpe1xyXG4gICAgICAgIGxldCBmaWVsZCA9ICQoXCIjXCIgKyBpZCkuZGF0YShcImVqQnV0dG9uXCIpO1xyXG4gICAgICAgIGlmKGZpZWxkICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGZpZWxkLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXNpemVzIHRoZSB0cmFjZSBjb250cm9sIHdpZGdldFxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gd2lkdGhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHRcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcmVzaXplKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKXtcclxuXHJcbiAgICAgICAgdGhpcy5fYWN0dWFsSGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuX2FjdHVhbFdpZHRoID0gd2lkdGg7XHJcblxyXG4gICAgICAgICQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpWzBdLnN0eWxlLndpZHRoID0gd2lkdGgudG9TdHJpbmcoKSArIFwicHhcIjtcclxuICAgICAgICAkKHRoaXMuY3NzUGFyZW50Q29udGVudElkKVswXS5zdHlsZS5oZWlnaHQgPSBoZWlnaHQudG9TdHJpbmcoKSArIFwicHhcIjtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnVwZGF0ZUR5bmFtaWNMYXlvdXQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIGR5bmFtaWMgbGF5b3V0IChlLmcuIHNtYWxsZXIgYnV0dG9ucyBpZiBzbWFsbCB3aWRnZXQgc2l6ZSlcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZUR5bmFtaWNMYXlvdXQoKXtcclxuICAgICAgICBsZXQgbmVlZGVkU2l6ZUZvckRlZmF1bHRMYXlvdXQgPSAxNDAwO1xyXG4gICAgICAgIGxldCBuZWVkZWRTaXplRm9yTWluaW16ZWRMYXlvdXRTdGVwMSA9IDEwMDA7XHJcbiAgICAgICAgaWYodGhpcy5fYWN0dWFsV2lkdGggPiBuZWVkZWRTaXplRm9yRGVmYXVsdExheW91dCl7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0TGF5b3V0KExheW91dFN0eWxlLkRlZmF1bHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHRoaXMuX2FjdHVhbFdpZHRoID4gbmVlZGVkU2l6ZUZvck1pbmltemVkTGF5b3V0U3RlcDEpe1xyXG4gICAgICAgICAgICB0aGlzLnNldExheW91dChMYXlvdXRTdHlsZS5NaW5pbWl6ZVN0ZXAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5zZXRMYXlvdXQoTGF5b3V0U3R5bGUuTWluaW1pemVTdGVwMik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgZHluYW1pYyBsYXlvdXQgdG8gYSBkZWZpbmVkIGxheW91dCBzdHlsZSAoZS5nLiBkZWZhdWx0IG9yIG1pbmltaXplZClcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtMYXlvdXRTdHlsZX0gbGF5b3V0U3R5bGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRMYXlvdXQobGF5b3V0U3R5bGU6IExheW91dFN0eWxlKXtcclxuICAgICAgICBzd2l0Y2gobGF5b3V0U3R5bGUpe1xyXG4gICAgICAgICAgICBjYXNlIExheW91dFN0eWxlLk1pbmltaXplU3RlcDI6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0QnV0dG9uTGF5b3V0KHRoaXMuX3NhdmVUcmFjZUNvbmZpZ3VyYXRpb25CdXR0b25JZCwgXCJcIiwgdGhpcy5fZGVmYXVsdEJ1dHRvbldpZHRoM01pbmltaXplZFN0ZXAyLCB0aGlzLmdldExlZnRQb3NpdGlvbigwLCBMYXlvdXRTdHlsZS5NaW5pbWl6ZVN0ZXAyKSArIFwicHhcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEJ1dHRvbkxheW91dCh0aGlzLl9pbXBvcnRUcmFjZUNvbmZpZ3VyYXRpb25CdXR0b25JZCwgXCJcIiwgdGhpcy5fZGVmYXVsdEJ1dHRvbldpZHRoM01pbmltaXplZFN0ZXAyLCB0aGlzLmdldExlZnRQb3NpdGlvbigxLCBMYXlvdXRTdHlsZS5NaW5pbWl6ZVN0ZXAyKSArIFwicHhcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEJ1dHRvbkxheW91dCh0aGlzLl9leHBvcnRUcmFjZUNvbmZpZ3VyYXRpb25CdXR0b25JZCwgXCJcIiwgdGhpcy5fZGVmYXVsdEJ1dHRvbldpZHRoM01pbmltaXplZFN0ZXAyLCB0aGlzLmdldExlZnRQb3NpdGlvbigyLCBMYXlvdXRTdHlsZS5NaW5pbWl6ZVN0ZXAyKSArIFwicHhcIik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIExheW91dFN0eWxlLk1pbmltaXplU3RlcDE6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0QnV0dG9uTGF5b3V0KHRoaXMuX3NhdmVUcmFjZUNvbmZpZ3VyYXRpb25CdXR0b25JZCwgQnV0dG9uVGV4dHMuU2F2ZVRyYWNlQ29uZmlndXJhdGlvbk1pbmltaXplZCwgdGhpcy5fZGVmYXVsdEJ1dHRvbldpZHRoM01pbmltaXplZFN0ZXAxLCB0aGlzLmdldExlZnRQb3NpdGlvbigwLCBMYXlvdXRTdHlsZS5NaW5pbWl6ZVN0ZXAxKSArIFwicHhcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEJ1dHRvbkxheW91dCh0aGlzLl9pbXBvcnRUcmFjZUNvbmZpZ3VyYXRpb25CdXR0b25JZCwgQnV0dG9uVGV4dHMuSW1wb3J0VHJhY2VDb25maWd1cmF0aW9uTWluaW1pemVkLCB0aGlzLl9kZWZhdWx0QnV0dG9uV2lkdGgzTWluaW1pemVkU3RlcDEsIHRoaXMuZ2V0TGVmdFBvc2l0aW9uKDEsIExheW91dFN0eWxlLk1pbmltaXplU3RlcDEpICsgXCJweFwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0QnV0dG9uTGF5b3V0KHRoaXMuX2V4cG9ydFRyYWNlQ29uZmlndXJhdGlvbkJ1dHRvbklkLCBCdXR0b25UZXh0cy5FeHBvcnRUcmFjZUNvbmZpZ3VyYXRpb25NaW5pbWl6ZWQsIHRoaXMuX2RlZmF1bHRCdXR0b25XaWR0aDNNaW5pbWl6ZWRTdGVwMSwgdGhpcy5nZXRMZWZ0UG9zaXRpb24oMiwgTGF5b3V0U3R5bGUuTWluaW1pemVTdGVwMSkgKyBcInB4XCIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBMYXlvdXRTdHlsZS5EZWZhdWx0OiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEJ1dHRvbkxheW91dCh0aGlzLl9zYXZlVHJhY2VDb25maWd1cmF0aW9uQnV0dG9uSWQsIEJ1dHRvblRleHRzLlNhdmVUcmFjZUNvbmZpZ3VyYXRpb24sIHRoaXMuX2RlZmF1bHRCdXR0b25XaWR0aDMsIHRoaXMuZ2V0TGVmdFBvc2l0aW9uKDApICsgXCJweFwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0QnV0dG9uTGF5b3V0KHRoaXMuX2ltcG9ydFRyYWNlQ29uZmlndXJhdGlvbkJ1dHRvbklkLCBCdXR0b25UZXh0cy5JbXBvcnRUcmFjZUNvbmZpZ3VyYXRpb24sIHRoaXMuX2RlZmF1bHRCdXR0b25XaWR0aDMsIHRoaXMuZ2V0TGVmdFBvc2l0aW9uKDEpICtcInB4XCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRCdXR0b25MYXlvdXQodGhpcy5fZXhwb3J0VHJhY2VDb25maWd1cmF0aW9uQnV0dG9uSWQsIEJ1dHRvblRleHRzLkV4cG9ydFRyYWNlQ29uZmlndXJhdGlvbiwgdGhpcy5fZGVmYXVsdEJ1dHRvbldpZHRoMywgdGhpcy5nZXRMZWZ0UG9zaXRpb24oMikgKyBcInB4XCIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogU2V0cyBhbmQgZGVmaW5lcyB0aGUgaW50ZXJmYWNlIHRvIHRoZSB0cmFjZSBjb250cm9sXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IHRyYWNlQ29udHJvbEludGVyZmFjZSh0cmFjZUNvbXBvbmVudENvbnRyb2w6IElUcmFjZUNvbXBvbmVudENvbnRyb2wpIHtcclxuICAgICAgICB0aGlzLl90cmFjZUNvbnRyb2xJbnRlcmZhY2UgPSB0cmFjZUNvbXBvbmVudENvbnRyb2w7XHJcbiAgICAgICAgaWYodGhpcy5fdHJhY2VDb250cm9sSW50ZXJmYWNlKXtcclxuICAgICAgICAgICAgdGhpcy5hZGREeW5hbWljQnV0dG9uc0ZvckF2YWlsYWJsZUNvbW1hbmRzKHRoaXMuX3RyYWNlQ29udHJvbEludGVyZmFjZSk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkVHJhY2VTdGF0ZSh0aGlzLl90cmFjZUNvbnRyb2xJbnRlcmZhY2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZCB0cmFjZSBzdGF0ZSBpbmZvIHRvIGxheW91dFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHRyYWNlQ29udHJvbEludGVyZmFjZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkZFRyYWNlU3RhdGUodHJhY2VDb250cm9sSW50ZXJmYWNlKXtcclxuICAgICAgICB0aGlzLmNyZWF0ZUZpZWxkKHRoaXMuX3N0YXRlRmllbGRJZCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gbGlzdGVuIHRvIGNoYW5nZWQgZXZlbnRzIG9mIHRyYWNlIHN0YXRlXHJcbiAgICAgICAgdHJhY2VDb250cm9sSW50ZXJmYWNlLnRyYWNlU3RhdGUuY2hhbmdlZCgodHJhY2VTdGF0ZVBhcmFtZXRlcik9PntcclxuICAgICAgICAgICAgdGhpcy5fYWN0dWFsVHJhY2VTdGF0ZSA9IHRyYWNlU3RhdGVQYXJhbWV0ZXIudmFsdWU7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hUcmFjZUNvbnRyb2xQYXJhbWV0ZXJWYWx1ZSh0cmFjZVN0YXRlUGFyYW1ldGVyKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyB0aGUgZHluYW1pYyBidXR0b25zIChzYXZlL2ltcG9ydC9leHBvcnQgdHJhY2UgY29uZmlndWF0aW9uKSBpZiBjb21tYW5kIGlzIGF2YWlsYWJsZSBpbiBjb21tYW5kIGludGVyZmFjZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGNvbW1hbmRzXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkRHluYW1pY0J1dHRvbnNGb3JBdmFpbGFibGVDb21tYW5kcyhjb21tYW5kcyl7XHJcbiAgICAgICAgaWYoY29tbWFuZHMuY29tbWFuZFNhdmVDb25maWd1cmF0aW9uKXtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVCdXR0b24odGhpcy5fc2F2ZVRyYWNlQ29uZmlndXJhdGlvbkJ1dHRvbklkLCBCdXR0b25UZXh0cy5TYXZlVHJhY2VDb25maWd1cmF0aW9uLCB0aGlzLmdldEltYWdlUGF0aChcInNhdmUuc3ZnXCIpLCB0aGlzLl9kZWZhdWx0QnV0dG9uV2lkdGgzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoY29tbWFuZHMuY29tbWFuZEltcG9ydFRyYWNlQ29uZmlndXJhdGlvbil7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQnV0dG9uKHRoaXMuX2ltcG9ydFRyYWNlQ29uZmlndXJhdGlvbkJ1dHRvbklkLCBCdXR0b25UZXh0cy5JbXBvcnRUcmFjZUNvbmZpZ3VyYXRpb24sICB0aGlzLmdldEltYWdlUGF0aChcImltcG9ydC5zdmdcIiksIHRoaXMuX2RlZmF1bHRCdXR0b25XaWR0aDMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihjb21tYW5kcy5jb21tYW5kRXhwb3J0VHJhY2VDb25maWd1cmF0aW9uKXtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVCdXR0b24odGhpcy5fZXhwb3J0VHJhY2VDb25maWd1cmF0aW9uQnV0dG9uSWQsIEJ1dHRvblRleHRzLkV4cG9ydFRyYWNlQ29uZmlndXJhdGlvbiwgIHRoaXMuZ2V0SW1hZ2VQYXRoKFwiZXhwb3J0LnN2Z1wiKSwgdGhpcy5fZGVmYXVsdEJ1dHRvbldpZHRoMylcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gVXBkYXRlIGxheW91dCBhZnRlciBhZGRpbmcgbmV3IGJ1dHRvbnNcclxuICAgICAgICB0aGlzLnVwZGF0ZUR5bmFtaWNMYXlvdXQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFdpbGwgYmUgY2FsbGVkIHdoZW4gYSBidXR0b24gd2FzIGNsaWNrZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBidXR0b25JZFxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNsaWNrKGJ1dHRvbklkKXtcclxuXHJcbiAgICAgICAgc3dpdGNoKGJ1dHRvbklkKXtcclxuICAgICAgICAgICAgY2FzZSB0aGlzLl9hY3RpdmF0ZUJ1dHRvbklkOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5leGVjdXRlQWN0aXZhdGUoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIHRoaXMuX2ZvcmNlU3RhcnRCdXR0b25JZDogICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5leGVjdXRlRm9yY2VTdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgdGhpcy5fZm9yY2VTdG9wQnV0dG9uSWQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmV4ZWN1dGVGb3JjZVN0b3AoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIHRoaXMuX3NhdmVUcmFjZUNvbmZpZ3VyYXRpb25CdXR0b25JZDpcclxuICAgICAgICAgICAgICAgIHRoaXMuZXhlY3V0ZVNhdmVDb25maWd1cmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSB0aGlzLl9pbXBvcnRUcmFjZUNvbmZpZ3VyYXRpb25CdXR0b25JZDpcclxuICAgICAgICAgICAgICAgIHRoaXMuaW1wb3J0VHJhY2VDb25maWd1cmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSB0aGlzLl9leHBvcnRUcmFjZUNvbmZpZ3VyYXRpb25CdXR0b25JZDpcclxuICAgICAgICAgICAgICAgIHRoaXMuZXhwb3J0VHJhY2VDb25maWd1cmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBY3RpdmF0ZXMgdGhlIHRyYWNlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBleGVjdXRlQWN0aXZhdGUoKXtcclxuICAgICAgICBpZiAodGhpcy5fdHJhY2VDb250cm9sSW50ZXJmYWNlKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX3NhdmVDb25maWdJc0FjdGl2ZSA9PSBmYWxzZSl7ICBcclxuICAgICAgICAgICAgICAgIHRoaXMuX2FjdGl2YXRlSXNBY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRCdXR0b25TdGF0ZXModGhpcy5fdHJhY2VDb250cm9sSW50ZXJmYWNlIS50cmFjZVN0YXRlLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3RyYWNlQ29udHJvbEludGVyZmFjZS5jb21tYW5kQWN0aXZhdGUuZXhlY3V0ZShudWxsLChyZXN1bHQpID0+e1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2FjdGl2YXRlSXNBY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEJ1dHRvblN0YXRlcyh0aGlzLl90cmFjZUNvbnRyb2xJbnRlcmZhY2UhLnRyYWNlU3RhdGUudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGb3JjZXMgc3RhcnRpbmcgdGhlIHRyYWNlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBleGVjdXRlRm9yY2VTdGFydCgpe1xyXG4gICAgICAgIGlmICh0aGlzLl90cmFjZUNvbnRyb2xJbnRlcmZhY2UpIHtcclxuICAgICAgICAgICAgaWYodGhpcy5fYWN0dWFsVHJhY2VTdGF0ZSA9PSBUcmFjZVN0YXRlSWRzLldhaXRfc3RhcnRfdHJpZ2dlcil7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90cmFjZUNvbnRyb2xJbnRlcmZhY2UuY29tbWFuZEZvcmNlU3RhcnQuZXhlY3V0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRm9yY2VzIHN0b3BwaW5nIHRoZSB0cmFjZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZXhlY3V0ZUZvcmNlU3RvcCgpe1xyXG4gICAgICAgIGlmICh0aGlzLl90cmFjZUNvbnRyb2xJbnRlcmZhY2UpIHtcclxuICAgICAgICAgICAgaWYodGhpcy5fYWN0dWFsVHJhY2VTdGF0ZSA9PSBUcmFjZVN0YXRlSWRzLldhaXRfc3RvcF9ldmVudCl7IC8vIE9ubHkgd2hpbGUgcnVubmluZ1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdHJhY2VDb250cm9sSW50ZXJmYWNlLmNvbW1hbmRGb3JjZVN0b3AuZXhlY3V0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2F2ZXMgdGhlIHRyYWNlIGNvbmZpZ3VyYXRpb24gb24gdGFyZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBleGVjdXRlU2F2ZUNvbmZpZ3VyYXRpb24oKXtcclxuICAgICAgICBpZiAodGhpcy5fdHJhY2VDb250cm9sSW50ZXJmYWNlKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuc2F2ZVRyYWNlQ29uZmlnUG9zc2libGVJblRoaXNTdGF0ZSh0aGlzLl9hY3R1YWxUcmFjZVN0YXRlKSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zYXZlQ29uZmlnSXNBY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRCdXR0b25TdGF0ZXModGhpcy5fdHJhY2VDb250cm9sSW50ZXJmYWNlIS50cmFjZVN0YXRlLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3RyYWNlQ29udHJvbEludGVyZmFjZS5jb21tYW5kU2F2ZUNvbmZpZ3VyYXRpb24uZXhlY3V0ZShudWxsLChyZXN1bHQpID0+e1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NhdmVDb25maWdJc0FjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0QnV0dG9uU3RhdGVzKHRoaXMuX3RyYWNlQ29udHJvbEludGVyZmFjZSEudHJhY2VTdGF0ZS52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE9wZW5zIGEgZmlsZSBzZWxlY3QgZGlhbG9nIGFuZCBpbXBvcnRzIGEgdHJhY2UgY29uZmlndXJhdGlvbiBmcm9tIHRoZSBmaWxlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpbXBvcnRUcmFjZUNvbmZpZ3VyYXRpb24oKXtcclxuICAgICAgICB0aGlzLl9maWxlUHJvdmlkZXIuZXZlbnRVcGxvYWREYXRhRmluaXNoZWQuYXR0YWNoKHRoaXMuX3VwbG9hZERhdGFGaW5pc2hlZEhhbmRsZXIpO1xyXG4gICAgICAgIHRoaXMuX2ZpbGVQcm92aWRlci51cGxvYWREYXRhKFwiLnRyYWNlY2ZnXCIpOyAvLyBPbmx5IHNob3cvYWNjZXB0ICoudHJhY2VjZmcgZmlsZXNcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEV4cG9ydCBhIHRyYWNlIGNvbmZpZ3VyYXRpb24gdG8gYSBmaWxlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBleHBvcnRUcmFjZUNvbmZpZ3VyYXRpb24oKXtcclxuXHJcbiAgICAgICAgdGhpcy5fdHJhY2VDb250cm9sSW50ZXJmYWNlIS5jb21tYW5kRXhwb3J0VHJhY2VDb25maWd1cmF0aW9uLmV4ZWN1dGUobnVsbCwocmVzdWx0KSA9PntcclxuICAgICAgICAgICAgdmFyIGJsb2IgPSBuZXcgQmxvYihbcmVzdWx0XSwgeyB0eXBlOiBcInRleHQveG1sXCIgfSk7XHJcbiAgICAgICAgICAgIEZpbGVQcm92aWRlci5kb3dubG9hZERhdGEoXCJUcmFjZUNvbmZpLnRyYWNlY2ZnXCIsIGJsb2IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSAgXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBPY2N1cnMgYWZ0ZXIgcmVhZGluZyBkYXRhIGZyb20gZmlsZSh0cmFjZSBjb25maWd1cmF0aW9uIGltcG9ydCBkYXRhKVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0hUTUxJbnB1dEVsZW1lbnR9IHNlbmRlclxyXG4gICAgICogQHBhcmFtIHtNYXA8c3RyaW5nLCBzdHJpbmc+fSBhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25VcGxvYWREYXRhRmluaXNoZWQoc2VuZGVyOiBIVE1MSW5wdXRFbGVtZW50LCBhcmdzOiBNYXA8c3RyaW5nLCBzdHJpbmc+KXtcclxuXHRcdC8qdGhpcy5zZXRCdXN5SW5mb3JtYXRpb24obmV3IEJ1c3lJbmZvcm1hdGlvbihcIkltcG9ydGluZyBkYXRhLi4uXCIsIEltYWdlSWQuZGVmYXVsdEltYWdlLCA0OCwgdHJ1ZSkpO1xyXG5cdFx0dGhpcy5zZXRCdXN5KHRydWUpOyovXHJcblx0XHRcclxuXHRcdC8vIFRpbWVvdXQgbmVlZGVkIHRvIHNob3cgdGhlIGJ1c3lzY3JlZW4gYmVmb3JlIGltcG9ydGluZyBkYXRhIFxyXG5cdFx0c2V0VGltZW91dCgoKSA9PiB0aGlzLmltcG9ydERhdGEoc2VuZGVyLCBhcmdzKSwgMjAwKTtcclxuXHJcblx0XHR0aGlzLl9maWxlUHJvdmlkZXIuZXZlbnRVcGxvYWREYXRhRmluaXNoZWQuZGV0YWNoKHRoaXMuX3VwbG9hZERhdGFGaW5pc2hlZEhhbmRsZXIpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuXHQgKiBpbXBvcnRzIHRoZSBnaXZlbiBmaWxlZGF0YSB3aXRoIHRoZSBnaXZlbiBmaWxlbmFtZVxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcGFyYW0ge0hUTUxJbnB1dEVsZW1lbnR9IGZpbGVJbnB1dEVsZW1lbnRcclxuXHQgKiBAcGFyYW0ge01hcDxzdHJpbmcsIHN0cmluZz59IGZpbGVDb250ZW50c1xyXG5cdCAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIGltcG9ydERhdGEoZmlsZUlucHV0RWxlbWVudDogSFRNTElucHV0RWxlbWVudCwgZmlsZUNvbnRlbnRzOiBNYXA8c3RyaW5nLCBzdHJpbmc+KXtcclxuICAgICAgICBcclxuICAgICAgICBpZihmaWxlQ29udGVudHMuc2l6ZSA9PT0gMSl7XHJcbiAgICAgICAgICAgIGxldCBmaWxlZGF0YSA9IGZpbGVDb250ZW50cy52YWx1ZXMoKS5uZXh0KCkudmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuX3RyYWNlQ29udHJvbEludGVyZmFjZSEuY29tbWFuZEltcG9ydFRyYWNlQ29uZmlndXJhdGlvbi5leGVjdXRlKGZpbGVkYXRhLChyZXN1bHQpID0+e1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cdH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlZnJlc2hlcyB0aGUgdHJhY2Ugc3RhdGUgKGRpc3BsYXluYW1lIG9mIHZhbHVlIGFuZCB0aGUgc3RhdGUgaWNvbilcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcn0gdHJhY2VDb250cm9sUGFyYW1ldGVyXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVmcmVzaFRyYWNlQ29udHJvbFBhcmFtZXRlclZhbHVlKHRyYWNlQ29udHJvbFBhcmFtZXRlcjogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIpIHtcclxuICAgICAgICBsZXQgdHJhY2VTdGF0ZSA9IHRyYWNlQ29udHJvbFBhcmFtZXRlci52YWx1ZTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnNldFRyYWNlU3RhdGVUZXh0KHRyYWNlU3RhdGUpO1xyXG4gICAgICAgIHRoaXMuc2V0VHJhY2VTdGF0ZUltYWdlKHRyYWNlU3RhdGUpO1xyXG4gICAgICAgIHRoaXMuc2V0QnV0dG9uU3RhdGVzKHRyYWNlU3RhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHRoZSBkaXNwbGF5IG5hbWUgZm9yIHRoZSB0cmFjZSBzdGF0ZSBpbiB0aGUgdmlzdWFsaXphdGlvblxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHJhY2VTdGF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldFRyYWNlU3RhdGVUZXh0KHRyYWNlU3RhdGU6IHN0cmluZyl7XHJcbiAgICAgICAgLy8gR2V0IGRpc3BsYXkgbmFtZSBmb3IgdGhlIHRyYWNlIHN0YXRlXHJcbiAgICAgICAgbGV0IHRyYWNlU3RhdGVEaXNwbGF5VGV4dCA9IFwiSW5hY3RpdmVcIjtcclxuICAgICAgICBpZih0cmFjZVN0YXRlID09IFRyYWNlU3RhdGVJZHMuQ29uZmlnX3Byb2Nlc3NpbmcgfHwgdHJhY2VTdGF0ZSA9PSBUcmFjZVN0YXRlSWRzLkNvbmZpZ19hcHBsaWVkKXtcclxuICAgICAgICAgICAgdHJhY2VTdGF0ZURpc3BsYXlUZXh0ID0gXCJBcHBseWluZyBjb25maWd1cmF0aW9uXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodHJhY2VTdGF0ZSA9PSBUcmFjZVN0YXRlSWRzLldhaXRfc3RhcnRfdHJpZ2dlcil7XHJcbiAgICAgICAgICAgIHRyYWNlU3RhdGVEaXNwbGF5VGV4dCA9IFwiV2FpdCBmb3Igc3RhcnQgdHJpZ2dlclwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHRyYWNlU3RhdGUgPT0gVHJhY2VTdGF0ZUlkcy5XYWl0X3N0b3BfZXZlbnQpe1xyXG4gICAgICAgICAgICB0cmFjZVN0YXRlRGlzcGxheVRleHQgPSBcIlJ1bm5pbmdcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih0cmFjZVN0YXRlID09IFRyYWNlU3RhdGVJZHMuRGF0YV9hdmFpbGFibGUpe1xyXG4gICAgICAgICAgICB0cmFjZVN0YXRlRGlzcGxheVRleHQgPSBcIkRhdGEgYXZhaWxhYmxlXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodHJhY2VTdGF0ZSA9PSBUcmFjZVN0YXRlSWRzLlJlY29yZF9mYWlsdXJlKXtcclxuICAgICAgICAgICAgdHJhY2VTdGF0ZURpc3BsYXlUZXh0ID0gXCJSZWNvcmQgZmFpbGVkXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIFNldCBkaXNwbGF5IG5hbWUgZm9yIHRoZSB0cmFjZSBzdGF0ZVxyXG4gICAgICAgICg8YW55PiQoXCIjXCIgKyB0aGlzLl9zdGF0ZUZpZWxkSWQpKS5lakJ1dHRvbih7XHJcbiAgICAgICAgICAgIHRleHQ6ICB0cmFjZVN0YXRlRGlzcGxheVRleHQsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIGFuIGltYWdlIGZvciB0aGUgdHJhY2Ugc3RhdGUgaW4gdGhlIHZpc3VhbGl6YXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRyYWNlU3RhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRUcmFjZVN0YXRlSW1hZ2UodHJhY2VTdGF0ZTpzdHJpbmcpe1xyXG4gICAgICAgIC8vIEdldCBpbWFnZSBmb3IgdGhlIHRyYWNlIHN0YXRlXHJcbiAgICAgICAgbGV0IGltYWdlcGF0aCA9ICB0aGlzLmdldEltYWdlUGF0aChcImluYWN0aXZlLnN2Z1wiKTtcclxuICAgICAgICBpZih0cmFjZVN0YXRlID09VHJhY2VTdGF0ZUlkcy5XYWl0X3N0YXJ0X3RyaWdnZXIpeyBcclxuICAgICAgICAgICAgaW1hZ2VwYXRoID0gIHRoaXMuZ2V0SW1hZ2VQYXRoKFwid2FpdF9zdGFydF90cmlnZ2VyLnN2Z1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih0cmFjZVN0YXRlID09IFRyYWNlU3RhdGVJZHMuV2FpdF9zdG9wX2V2ZW50KXtcclxuICAgICAgICAgICAgaW1hZ2VwYXRoID0gIHRoaXMuZ2V0SW1hZ2VQYXRoKFwid2FpdF9zdG9wX2V2ZW50LnN2Z1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih0cmFjZVN0YXRlID09IFRyYWNlU3RhdGVJZHMuRGF0YV9hdmFpbGFibGUpe1xyXG4gICAgICAgICAgICBpbWFnZXBhdGggPSAgdGhpcy5nZXRJbWFnZVBhdGgoXCJkYXRhX2F2YWlsYWJsZS5zdmdcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTZXQgaW1hZ2UgZm9yIHRoZSB0cmFjZSBzdGF0ZVxyXG4gICAgICAgIGxldCBpbWFnZUVsZW1lbnQgPSAkKFwiI1wiICsgdGhpcy5fc3RhdGVJbWFnZSlbMF07XHJcbiAgICAgICAgaWYoaW1hZ2VFbGVtZW50ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGltYWdlRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcInVybCgnXCIgKyBpbWFnZXBhdGggK1wiJylcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBzdGF0ZXMoZW5hYmxlZC9kaXNhYmxlZCkgb2YgdGhlIGJ1dHRvbnMgZm9yIHRoZSBnaXZlbiB0cmFjZSBzdGF0ZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHJhY2VTdGF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldEJ1dHRvblN0YXRlcyh0cmFjZVN0YXRlOiBzdHJpbmcpe1xyXG4gICAgICAgIGlmKHRyYWNlU3RhdGUgPT0gVHJhY2VTdGF0ZUlkcy5XYWl0X3N0YXJ0X3RyaWdnZXIpe1xyXG4gICAgICAgICAgICB0aGlzLnNldEJ1dHRvblN0YXRlSW5XYWl0U3RhcnRUcmlnZ2VyU3RhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih0cmFjZVN0YXRlID09IFRyYWNlU3RhdGVJZHMuV2FpdF9zdG9wX2V2ZW50KXtcclxuICAgICAgICAgICAgdGhpcy5zZXRCdXR0b25TdGF0ZUluV2FpdFN0b3BFdmVudFN0YXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuc2F2ZVRyYWNlQ29uZmlnUG9zc2libGVJblRoaXNTdGF0ZSh0cmFjZVN0YXRlKSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlYWN0aXZhdGVCdXR0b24odGhpcy5fc2F2ZVRyYWNlQ29uZmlndXJhdGlvbkJ1dHRvbklkLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gb3RoZXIgc3RhdGUgPT4gZGVhY3RpdmF0ZSBmb3JjZSBzdGFydCB0cmlnZ2VyIGFuZCBmb3JjZSBzdG9wIGV2ZW50XHJcbiAgICAgICAgICAgIHRoaXMuZGVhY3RpdmF0ZUJ1dHRvbih0aGlzLl9mb3JjZVN0YXJ0QnV0dG9uSWQsIHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLmRlYWN0aXZhdGVCdXR0b24odGhpcy5fZm9yY2VTdG9wQnV0dG9uSWQsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgLy8gc2V0IGFjdGl2YXRlIGJ1dHRvbiBzdGF0ZVxyXG4gICAgICAgICAgICBpZih0aGlzLl9hY3RpdmF0ZUlzQWN0aXZlID09IGZhbHNlICYmIHRoaXMuX3NhdmVDb25maWdJc0FjdGl2ZSA9PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlYWN0aXZhdGVCdXR0b24odGhpcy5fYWN0aXZhdGVCdXR0b25JZCwgZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlYWN0aXZhdGVCdXR0b24odGhpcy5fYWN0aXZhdGVCdXR0b25JZCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgYnV0dG9uIHN0YXRlcyBpZiB0aGUgdHJhY2Ugc3RhdGUgaXMgd2FpdGluZyBmb3Igc3RhcnQgdHJpZ2dlclxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0QnV0dG9uU3RhdGVJbldhaXRTdGFydFRyaWdnZXJTdGF0ZSgpe1xyXG4gICAgICAgIC8vIFdhaXQgZm9yIHN0YXJ0IHRyaWdnZXIgPT4gYWN0aXZhdGUgZm9yY2Ugc3RhcnQ7IGRlYWN0aXZhdGUgZm9yY2Ugc3RvcCBldmVudFxyXG4gICAgICAgIHRoaXMuZGVhY3RpdmF0ZUJ1dHRvbih0aGlzLl9mb3JjZVN0YXJ0QnV0dG9uSWQsIGZhbHNlKTtcclxuICAgICAgICB0aGlzLmRlYWN0aXZhdGVCdXR0b24odGhpcy5fZm9yY2VTdG9wQnV0dG9uSWQsIHRydWUpO1xyXG4gICAgICAgIHRoaXMuZGVhY3RpdmF0ZUJ1dHRvbih0aGlzLl9zYXZlVHJhY2VDb25maWd1cmF0aW9uQnV0dG9uSWQsIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgYnV0dG9uIHN0YXRlcyBpZiB0aGUgdHJhY2Ugc3RhdGUgaXMgd2FpdGluZyBmb3IgdGhlIHN0b3AgZXZlbnRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldEJ1dHRvblN0YXRlSW5XYWl0U3RvcEV2ZW50U3RhdGUoKXtcclxuICAgICAgICAvLyBSdW5uaW5nID0+IGRlYWN0aXZhdGUgZm9yY2Ugc3RhcnQgdHJpZ2dlcjsgYWN0aXZhdGUgZm9yY2Ugc3RvcCBldmVudFxyXG4gICAgICAgIHRoaXMuZGVhY3RpdmF0ZUJ1dHRvbih0aGlzLl9mb3JjZVN0YXJ0QnV0dG9uSWQsIHRydWUpO1xyXG4gICAgICAgIHRoaXMuZGVhY3RpdmF0ZUJ1dHRvbih0aGlzLl9mb3JjZVN0b3BCdXR0b25JZCwgZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuZGVhY3RpdmF0ZUJ1dHRvbih0aGlzLl9zYXZlVHJhY2VDb25maWd1cmF0aW9uQnV0dG9uSWQsIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgaW1hZ2VQYXRoIGZvciB0aGUgZ2l2ZW4gaW1hZ2VOYW1lIGFuZCBzdGF0ZShhY3RpdmF0ZWQvZGVhY3RpdmF0ZWQpXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpbWFnZU5hbWVcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2RlYWN0aXZhdGVkPWZhbHNlXVxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRJbWFnZVBhdGgoaW1hZ2VOYW1lOiBzdHJpbmcsIGRlYWN0aXZhdGVkOiBib29sZWFuID0gZmFsc2UpOnN0cmluZ3tcclxuICAgICAgICBpZihkZWFjdGl2YXRlZCA9PSB0cnVlKXtcclxuICAgICAgICAgICAgaW1hZ2VOYW1lID0gaW1hZ2VOYW1lLnJlcGxhY2UoXCIuc3ZnXCIsIFwiX2RlYWN0aXZhdGVkLnN2Z1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFRoZW1lUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5nZXRUaGVtZWRGaWxlUGF0aChcIndpZGdldHMvdHJhY2VDb250cm9sV2lkZ2V0L3N0eWxlL2ltYWdlcy9cIiArIGltYWdlTmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm4gdHJ1ZSBpZiBzYXZlaW5nIG9mIHRyYWNlIGNvbmZpZ3VyYXRpb24gaXMgcG9zc2libGUgaW4gdGhlIGN1cnJlbnQgdHJhY2Ugc3RhdGVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBzdGF0ZVxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2F2ZVRyYWNlQ29uZmlnUG9zc2libGVJblRoaXNTdGF0ZShzdGF0ZSk6IGJvb2xlYW57XHJcbiAgICAgICAgaWYoc3RhdGUgPT0gVHJhY2VTdGF0ZUlkcy5EaXNhYmxlZCB8fCBzdGF0ZSA9PSBUcmFjZVN0YXRlSWRzLkRhdGFfYXZhaWxhYmxlIHx8IHN0YXRlID09IFRyYWNlU3RhdGVJZHMuUmVjb3JkX2ZhaWx1cmUpe1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBUcmFjZUNvbnRyb2xXaWRnZXQgfTsiXX0=