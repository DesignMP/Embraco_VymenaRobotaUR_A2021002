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
define(["require", "exports", "../common/widgetBase", "../common/domHelper", "../common/themeProvider", "../../common/fileProvider", "../../models/diagnostics/trace/traceConfig/traceConfigDefines", "./defaultComponentSettings"], function (require, exports, widgetBase_1, domHelper_1, themeProvider_1, fileProvider_1, traceConfigDefines_1, defaultComponentSettings_1) {
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
        TraceControlWidget.prototype.initializeComponent = function () {
            this.component.defaultSettingsDataId = defaultComponentSettings_1.DefaultComponentSettings.WidgetDefinitionId;
            this.component.disablePersisting();
        };
        /**
         * Returns the default component settings for this widget
         *
         * @returns {(ComponentSettings|undefined)}
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.getDefaultComponentSettings = function () {
            return defaultComponentSettings_1.DefaultComponentSettings.getTraceControlDefinition();
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
        TraceControlWidget.prototype.createLayout = function () {
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
            this.createField(this._stateFieldId);
            this.refreshTraceControlParameterValue(this._actualTraceState);
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
            // invoke activate trace by using a component command
            if (this._saveConfigIsActive == false) {
                this._activateIsActive = true;
                this.setButtonStates(this._traceControlInterface.traceState.value);
                this.activateTrace();
            }
        };
        TraceControlWidget.prototype.activateTrace = function () {
            // BINDINGSOURCE: dispatches the mthod to bound targets
        };
        /**
         * Processes trace activation response
         *
         * @private
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.onTraceActivated = function () {
            this._activateIsActive = false;
            this.setButtonStates(this._actualTraceState);
        };
        /**
         * handles trace state changes
         *
         * @param {*} traceState
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.onTraceStateChanged = function (traceState) {
            this._actualTraceState = traceState;
            this.refreshTraceControlParameterValue(traceState);
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
        TraceControlWidget.prototype.refreshTraceControlParameterValue = function (traceState) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2VDb250cm9sV2lkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL3RyYWNlQ29udHJvbFdpZGdldC90cmFjZUNvbnRyb2xXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQVVBOzs7O09BSUc7SUFDSCxJQUFLLFdBS0o7SUFMRCxXQUFLLFdBQVc7UUFDWixtREFBTyxDQUFBO1FBQ1AsK0RBQWEsQ0FBQTtRQUNiLCtEQUFhLENBQUE7UUFDYiwrREFBYSxDQUFBO0lBQ2pCLENBQUMsRUFMSSxXQUFXLEtBQVgsV0FBVyxRQUtmO0lBRUQ7Ozs7T0FJRztJQUNIO1FBQUE7UUFhQSxDQUFDO1FBWkcsdUJBQXVCO1FBQ1Asb0JBQVEsR0FBRyxVQUFVLENBQUM7UUFDdEIsc0JBQVUsR0FBRyxhQUFhLENBQUM7UUFDM0IscUJBQVMsR0FBRyxZQUFZLENBQUM7UUFDekIsa0NBQXNCLEdBQUcsMEJBQTBCLENBQUM7UUFDcEQsb0NBQXdCLEdBQUcsNEJBQTRCLENBQUM7UUFDeEQsb0NBQXdCLEdBQUcsNEJBQTRCLENBQUM7UUFFeEUseUJBQXlCO1FBQ1QsMkNBQStCLEdBQUcsTUFBTSxDQUFDO1FBQ3pDLDZDQUFpQyxHQUFHLFFBQVEsQ0FBQztRQUM3Qyw2Q0FBaUMsR0FBRyxRQUFRLENBQUM7UUFDakUsa0JBQUM7S0FBQSxBQWJELElBYUM7SUFFRDs7Ozs7T0FLRztJQUNIO1FBQWlDLHNDQUFVO1FBQTNDO1lBQUEscUVBbTFCQztZQXowQlcsdUJBQWlCLEdBQUcsa0NBQWEsQ0FBQyxRQUFRLENBQUM7WUFFM0MseUJBQW1CLEdBQUcsS0FBSyxDQUFDO1lBQzVCLHVCQUFpQixHQUFHLEtBQUssQ0FBQztZQUkxQixtQkFBYSxHQUFHLElBQUksMkJBQVksRUFBRSxDQUFDO1lBRW5DLGdDQUEwQixHQUFHLFVBQUMsTUFBTSxFQUFDLElBQUksSUFBRyxPQUFBLEtB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QixDQUFDO1FBQ0wseUJBQUM7SUFBRCxDQUFDLEFBbjFCRCxDQUFpQyx1QkFBVSxHQW0xQjFDO0lBRVEsZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgV2lkZ2V0QmFzZSB9IGZyb20gXCIuLi9jb21tb24vd2lkZ2V0QmFzZVwiO1xyXG5pbXBvcnQgeyBJVHJhY2VDb250cm9sV2lkZ2V0IH0gZnJvbSBcIi4vaW50ZXJmYWNlcy90cmFjZUNvbnRyb2xXaWRnZXRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVRyYWNlQ29tcG9uZW50Q29udHJvbCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvZGlhZ25vc3RpY3MvdHJhY2UvaW50ZXJmYWNlcy90cmFjZUNvbnRyb2xQcm92aWRlckludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBEb21IZWxwZXIgfSBmcm9tIFwiLi4vY29tbW9uL2RvbUhlbHBlclwiO1xyXG5pbXBvcnQgeyBUaGVtZVByb3ZpZGVyIH0gZnJvbSBcIi4uL2NvbW1vbi90aGVtZVByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IEZpbGVQcm92aWRlciB9IGZyb20gXCIuLi8uLi9jb21tb24vZmlsZVByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IFRyYWNlU3RhdGVJZHMgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2RpYWdub3N0aWNzL3RyYWNlL3RyYWNlQ29uZmlnL3RyYWNlQ29uZmlnRGVmaW5lc1wiO1xyXG5pbXBvcnQgeyBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MgfSBmcm9tIFwiLi9kZWZhdWx0Q29tcG9uZW50U2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50U2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbXBvbmVudEJhc2UvY29tcG9uZW50U2V0dGluZ3NcIjtcclxuXHJcbi8qKlxyXG4gKiBMYXlvdXQgc3R5bGVzIGZvciBkeW5hbWljIGxheW91dFxyXG4gKlxyXG4gKiBAZW51bSB7bnVtYmVyfVxyXG4gKi9cclxuZW51bSBMYXlvdXRTdHlsZXtcclxuICAgIERlZmF1bHQsXHJcbiAgICBNaW5pbWl6ZVN0ZXAxLFxyXG4gICAgTWluaW1pemVTdGVwMixcclxuICAgIE1pbmltaXplU3RlcDMsXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaGUgdGV4dHMgZm9yIHRoZSBidXR0b25zXHJcbiAqXHJcbiAqIEBjbGFzcyBCdXR0b25UZXh0c1xyXG4gKi9cclxuY2xhc3MgQnV0dG9uVGV4dHN7XHJcbiAgICAvLyBEZWZhdWx0IGJ1dHRvbiB0ZXh0c1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IEFjdGl2YXRlID0gXCJBY3RpdmF0ZVwiO1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IEZvcmNlU3RhcnQgPSBcIkZvcmNlIHN0YXJ0XCI7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgRm9yY2VTdG9wID0gXCJGb3JjZSBzdG9wXCI7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgU2F2ZVRyYWNlQ29uZmlndXJhdGlvbiA9IFwiU2F2ZSB0cmFjZSBjb25maWd1cmF0aW9uXCI7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgSW1wb3J0VHJhY2VDb25maWd1cmF0aW9uID0gXCJJbXBvcnQgdHJhY2UgY29uZmlndXJhdGlvblwiO1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IEV4cG9ydFRyYWNlQ29uZmlndXJhdGlvbiA9IFwiRXhwb3J0IHRyYWNlIGNvbmZpZ3VyYXRpb25cIjtcclxuXHJcbiAgICAvLyBNaW5pbWl6ZWQgYnV0dG9uIHRleHRzXHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgU2F2ZVRyYWNlQ29uZmlndXJhdGlvbk1pbmltaXplZCA9IFwiU2F2ZVwiO1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IEltcG9ydFRyYWNlQ29uZmlndXJhdGlvbk1pbmltaXplZCA9IFwiSW1wb3J0XCI7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgRXhwb3J0VHJhY2VDb25maWd1cmF0aW9uTWluaW1pemVkID0gXCJFeHBvcnRcIjtcclxufVxyXG5cclxuLyoqXHJcbiAqIGltcGxlbWVudHMgdGhlIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gKlxyXG4gKiBAY2xhc3MgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAqIEBleHRlbmRzIHtXaWRnZXRCYXNlfVxyXG4gKi9cclxuY2xhc3MgVHJhY2VDb250cm9sV2lkZ2V0IGV4dGVuZHMgV2lkZ2V0QmFzZSBpbXBsZW1lbnRzIElUcmFjZUNvbnRyb2xXaWRnZXQge1xyXG4gICAgcHJpdmF0ZSBfc3RhdGVGaWVsZElkO1xyXG4gICAgcHJpdmF0ZSBfc3RhdGVJbWFnZTtcclxuXHJcbiAgICBwcml2YXRlIF9hY3RpdmF0ZUJ1dHRvbklkO1xyXG4gICAgcHJpdmF0ZSBfZm9yY2VTdGFydEJ1dHRvbklkO1xyXG4gICAgcHJpdmF0ZSBfZm9yY2VTdG9wQnV0dG9uSWQ7XHJcbiAgICBwcml2YXRlIF9zYXZlVHJhY2VDb25maWd1cmF0aW9uQnV0dG9uSWQ7XHJcbiAgICBwcml2YXRlIF9pbXBvcnRUcmFjZUNvbmZpZ3VyYXRpb25CdXR0b25JZDtcclxuICAgIHByaXZhdGUgX2V4cG9ydFRyYWNlQ29uZmlndXJhdGlvbkJ1dHRvbklkO1xyXG4gICAgcHJpdmF0ZSBfYWN0dWFsVHJhY2VTdGF0ZSA9IFRyYWNlU3RhdGVJZHMuRGlzYWJsZWQ7XHJcblxyXG4gICAgcHJpdmF0ZSBfc2F2ZUNvbmZpZ0lzQWN0aXZlID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIF9hY3RpdmF0ZUlzQWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgcHJpdmF0ZSBfdHJhY2VDb250cm9sSW50ZXJmYWNlOiBJVHJhY2VDb21wb25lbnRDb250cm9sfHVuZGVmaW5lZDtcclxuXHRcdFxyXG4gICAgcHJpdmF0ZSBfZmlsZVByb3ZpZGVyID0gbmV3IEZpbGVQcm92aWRlcigpO1xyXG5cdFxyXG4gICAgcHJpdmF0ZSBfdXBsb2FkRGF0YUZpbmlzaGVkSGFuZGxlciA9IChzZW5kZXIsYXJncyk9PnRoaXMub25VcGxvYWREYXRhRmluaXNoZWQoc2VuZGVyLGFyZ3MpO1xyXG4gICAgICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZhdWx0IGJ1dHRvbiB3aWR0aCBmb3IgYWN0aXZlIGJ1dHRvblxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2RlZmF1bHRCdXR0b25XaWR0aDEgPSBcIjg1cHhcIjtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZhdWx0IGJ1dHRvbiB3aWR0aCBmb3IgZm9yY2Ugc3RhcnQvc3RvcCBidXR0b25cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9kZWZhdWx0QnV0dG9uV2lkdGgyID0gXCIxMDBweFwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmYXVsdCBidXR0b24gd2lkdGggZm9yIHNhdmUvaW1wb3J0L2V4cG9ydCB0cmFjZSBjb25maWcgYnV0dG9uc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2RlZmF1bHRCdXR0b25XaWR0aDMgPSBcIjE5NXB4XCI7XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWluaW1pemVkIFN0ZXAgMSBidXR0b24gd2lkdGggZm9yIHNhdmUvaW1wb3J0L2V4cG9ydCB0cmFjZSBjb25maWcgYnV0dG9uc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2RlZmF1bHRCdXR0b25XaWR0aDNNaW5pbWl6ZWRTdGVwMSA9IFwiNjBweFwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWluaW1pemVkIFN0ZXAgMiBidXR0b24gd2lkdGggZm9yIHNhdmUvaW1wb3J0L2V4cG9ydCB0cmFjZSBjb25maWcgYnV0dG9uc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2RlZmF1bHRCdXR0b25XaWR0aDNNaW5pbWl6ZWRTdGVwMiA9IFwiMTZweFwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmYXVsdCBsZWZ0IHBvc2l0aW9uIG9mIHRoZSBzYXZlL2ltcG9ydC9leHBvcnQgYnV0dG9uc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2xlZnRQb3NpdGlvblN0YXJ0ID0gNzMwO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmYXVsdCBzcGFjZSBiZXR3ZWVuIHRoZSAgc2F2ZS9pbXBvcnQvZXhwb3J0IGJ1dHRvbnNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9kZWZhdWx0QnV0dG9uU3BhY2UgPSAzNTtcclxuICAgICBcclxuICAgIGluaXRpYWxpemVDb21wb25lbnQoKXtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5kZWZhdWx0U2V0dGluZ3NEYXRhSWQgPSBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MuV2lkZ2V0RGVmaW5pdGlvbklkO1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmRpc2FibGVQZXJzaXN0aW5nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkZWZhdWx0IGNvbXBvbmVudCBzZXR0aW5ncyBmb3IgdGhpcyB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7KENvbXBvbmVudFNldHRpbmdzfHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGdldERlZmF1bHRDb21wb25lbnRTZXR0aW5ncygpOiBDb21wb25lbnRTZXR0aW5nc3x1bmRlZmluZWR7XHJcbiAgICAgICAgcmV0dXJuIERlZmF1bHRDb21wb25lbnRTZXR0aW5ncy5nZXRUcmFjZUNvbnRyb2xEZWZpbml0aW9uKCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGlzcG9zZSBzb21lIG9iamVjdHMgZnJvbSB0aGlzIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xXaWRnZXRcclxuICAgICAqL1xyXG4gICAgZGlzcG9zZSgpe1xyXG4gICAgICAgIC8vIERpc3Bvc2Ugc3RhdGljIGJ1dHRvbiBhbmQgZmllbGRzXHJcbiAgICAgICAgdGhpcy5kZXN0cm95QnV0dG9uKHRoaXMuX2FjdGl2YXRlQnV0dG9uSWQpO1xyXG4gICAgICAgIHRoaXMuZGVzdHJveUZpZWxkKHRoaXMuX3N0YXRlRmllbGRJZCk7XHJcbiAgICAgICAgdGhpcy5kZXN0cm95QnV0dG9uKHRoaXMuX2ZvcmNlU3RhcnRCdXR0b25JZCk7XHJcbiAgICAgICAgdGhpcy5kZXN0cm95QnV0dG9uKHRoaXMuX2ZvcmNlU3RvcEJ1dHRvbklkKTtcclxuXHJcbiAgICAgICAgLy8gRGlzcG9zZSBkeW5hbWljIGJ1dHRvbnMgaWYgYXZhaWxhYmxlXHJcbiAgICAgICAgdGhpcy5kZXN0cm95QnV0dG9uKHRoaXMuX3NhdmVUcmFjZUNvbmZpZ3VyYXRpb25CdXR0b25JZCk7XHJcbiAgICAgICAgdGhpcy5kZXN0cm95QnV0dG9uKHRoaXMuX2ltcG9ydFRyYWNlQ29uZmlndXJhdGlvbkJ1dHRvbklkKTtcclxuICAgICAgICB0aGlzLmRlc3Ryb3lCdXR0b24odGhpcy5fZXhwb3J0VHJhY2VDb25maWd1cmF0aW9uQnV0dG9uSWQpXHJcblxyXG4gICAgICAgIHN1cGVyLmRpc3Bvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIHdpZGdldCBjb250ZW50IGFuZCBldmVudHVhbGx5IHN1YndpZGdldHNcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGNyZWF0ZUxheW91dCgpIHtcclxuICAgICAgICB0aGlzLmluaXRCdXR0b25BbmRGaWVsZElkcygpO1xyXG5cclxuICAgICAgICB0aGlzLmNyZWF0ZURpdkJ1dHRvbnNBbmRGaWVsZHNMYXlvdXQoKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmFkZFN0YXRpY0J1dHRvbnMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEluaXRpYWxpemVzIHRoZSBpZHMgZm9yIHRoZSBidXR0b25zIGFuZCBmaWVsZHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGluaXRCdXR0b25BbmRGaWVsZElkcygpe1xyXG4gICAgICAgIGxldCBsYXlvdXRDb250YWluZXJJZCA9IHRoaXMucGFyZW50Q29udGVudElkO1xyXG4gICAgICAgIHRoaXMuX2FjdGl2YXRlQnV0dG9uSWQgPSBsYXlvdXRDb250YWluZXJJZCArIFwiX2FjdGl2YXRlQnV0dG9uXCI7XHJcbiAgICAgICAgdGhpcy5fZm9yY2VTdGFydEJ1dHRvbklkID0gbGF5b3V0Q29udGFpbmVySWQgKyBcIl9mb3JjZVN0YXJ0QnV0dG9uXCI7XHJcbiAgICAgICAgdGhpcy5fZm9yY2VTdG9wQnV0dG9uSWQgPSBsYXlvdXRDb250YWluZXJJZCArIFwiX2ZvcmNlU3RvcEJ1dHRvblwiO1xyXG4gICAgICAgIHRoaXMuX3NhdmVUcmFjZUNvbmZpZ3VyYXRpb25CdXR0b25JZCA9IGxheW91dENvbnRhaW5lcklkICsgXCJfc2F2ZVRyYWNlQ29uZmlndXJhdGlvbkJ1dHRvblwiO1xyXG4gICAgICAgIHRoaXMuX2ltcG9ydFRyYWNlQ29uZmlndXJhdGlvbkJ1dHRvbklkID0gbGF5b3V0Q29udGFpbmVySWQgKyBcIl9pbXBvcnRUcmFjZUNvbmZpZ3VyYXRpb25CdXR0b25cIjtcclxuICAgICAgICB0aGlzLl9leHBvcnRUcmFjZUNvbmZpZ3VyYXRpb25CdXR0b25JZCA9IGxheW91dENvbnRhaW5lcklkICsgXCJfZXhwb3J0VHJhY2VDb25maWd1cmF0aW9uQnV0dG9uXCI7XHJcbiAgICAgICAgdGhpcy5fc3RhdGVGaWVsZElkID0gbGF5b3V0Q29udGFpbmVySWQgKyBcInRyYWNlY29udHJvbF9zdGF0ZVwiO1xyXG4gICAgICAgIHRoaXMuX3N0YXRlSW1hZ2UgPSBsYXlvdXRDb250YWluZXJJZCArIFwidHJhY2Vjb250cm9sX3N0YXRlX2ltYWdlXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHRoZSBsYXlvdXQgZm9yIHRoZSBidXR0b25zIGFuZCBmaWVsZHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0ZURpdkJ1dHRvbnNBbmRGaWVsZHNMYXlvdXQoKXtcclxuICAgICAgICBsZXQgZWxlbWVudCA9ICQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpO1xyXG4gICAgICAgIGVsZW1lbnRbMF0uc3R5bGUucGFkZGluZ1RvcCA9IFwiNHB4XCI7XHJcbiAgICAgICAgZWxlbWVudFswXS5zdHlsZS5iYWNrZ3JvdW5kID0gXCJ2YXIoLS1tYWluLWdyZXktZGFyazIpXCI7XHJcbiAgICAgICAgZWxlbWVudFswXS5zdHlsZS5vdmVyZmxvdyA9IFwiaGlkZGVuXCI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZWxlbWVudC5hcHBlbmQoXCI8ZGl2IHN0eWxlPSdsZWZ0OiAyNXB4OyBwb3NpdGlvbjogYWJzb2x1dGU7JyBpZD0nXCIrIHRoaXMuX2FjdGl2YXRlQnV0dG9uSWQgK1wiJz48L2Rpdj5cIik7XHJcbiAgICAgICAgZWxlbWVudC5hcHBlbmQoXCI8ZGl2IHN0eWxlPSd0b3A6IDEwcHg7IGxlZnQ6IDE1MHB4OyBwb3NpdGlvbjogYWJzb2x1dGU7JyBjbGFzcz0ndHJhY2VDb250cm9sU3RhdGVJbWFnZScgaWQ9J1wiKyB0aGlzLl9zdGF0ZUltYWdlICtcIic+PC9kaXY+XCIpO1xyXG4gICAgICAgIGVsZW1lbnQuYXBwZW5kKFwiPGRpdiBzdHlsZT0ndG9wOiAxMHB4OyBsZWZ0OiAxODBweDsgcG9zaXRpb246IGFic29sdXRlOycgaWQ9J1wiKyB0aGlzLl9zdGF0ZUZpZWxkSWQgK1wiJz48L2Rpdj5cIik7XHJcbiAgICAgICAgZWxlbWVudC5hcHBlbmQoXCI8ZGl2IHN0eWxlPSdsZWZ0OiAzNDBweDsgcG9zaXRpb246IGFic29sdXRlOycgaWQ9J1wiKyB0aGlzLl9mb3JjZVN0YXJ0QnV0dG9uSWQgK1wiJz48L2Rpdj5cIik7XHJcbiAgICAgICAgZWxlbWVudC5hcHBlbmQoXCI8ZGl2IHN0eWxlPSdsZWZ0OiA0NzVweDsgcG9zaXRpb246IGFic29sdXRlOycgaWQ9J1wiKyB0aGlzLl9mb3JjZVN0b3BCdXR0b25JZCArXCInPjwvZGl2PlwiKTtcclxuICAgICAgICBlbGVtZW50LmFwcGVuZChcIjxkaXYgc3R5bGU9J2xlZnQ6IFwiICsgdGhpcy5nZXRMZWZ0UG9zaXRpb24oMCkgKyBcInB4OyBwb3NpdGlvbjogYWJzb2x1dGU7JyBpZD0nXCIrIHRoaXMuX3NhdmVUcmFjZUNvbmZpZ3VyYXRpb25CdXR0b25JZCArXCInPjwvZGl2PlwiKTtcclxuICAgICAgICBlbGVtZW50LmFwcGVuZChcIjxkaXYgc3R5bGU9J2xlZnQ6IFwiICsgdGhpcy5nZXRMZWZ0UG9zaXRpb24oMSkgKyBcInB4OyBwb3NpdGlvbjogYWJzb2x1dGU7JyBpZD0nXCIrIHRoaXMuX2ltcG9ydFRyYWNlQ29uZmlndXJhdGlvbkJ1dHRvbklkICtcIic+PC9kaXY+XCIpO1xyXG4gICAgICAgIGVsZW1lbnQuYXBwZW5kKFwiPGRpdiBzdHlsZT0nbGVmdDogXCIgKyB0aGlzLmdldExlZnRQb3NpdGlvbigyKSArIFwicHg7IHBvc2l0aW9uOiBhYnNvbHV0ZTsnIGlkPSdcIisgdGhpcy5fZXhwb3J0VHJhY2VDb25maWd1cmF0aW9uQnV0dG9uSWQgK1wiJz48L2Rpdj5cIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBsZWZ0IHBvc2l0aW9uIG9mIGEgYnV0dG9uIGZvciB0aGUgZ2l2ZW4gTGF5b3V0U3R5bGVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4XHJcbiAgICAgKiBAcGFyYW0ge0xheW91dFN0eWxlfSBbbGF5b3V0U3R5bGU9TGF5b3V0U3R5bGUuRGVmYXVsdF1cclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0TGVmdFBvc2l0aW9uKGluZGV4OiBudW1iZXIsIGxheW91dFN0eWxlOiBMYXlvdXRTdHlsZSA9IExheW91dFN0eWxlLkRlZmF1bHQpOiBudW1iZXJ7XHJcbiAgICAgICAgaWYoaW5kZXggPT0gMCl7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9sZWZ0UG9zaXRpb25TdGFydDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgbGV0IGRlZmF1bHRCdXR0b25XaWR0aCA9IHRoaXMuX2RlZmF1bHRCdXR0b25XaWR0aDM7XHJcbiAgICAgICAgICAgIGlmKGxheW91dFN0eWxlID09IExheW91dFN0eWxlLk1pbmltaXplU3RlcDEpe1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdEJ1dHRvbldpZHRoID0gdGhpcy5fZGVmYXVsdEJ1dHRvbldpZHRoM01pbmltaXplZFN0ZXAxO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZihsYXlvdXRTdHlsZSA9PSBMYXlvdXRTdHlsZS5NaW5pbWl6ZVN0ZXAyKXtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHRCdXR0b25XaWR0aCA9IHRoaXMuX2RlZmF1bHRCdXR0b25XaWR0aDNNaW5pbWl6ZWRTdGVwMjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgYnV0dG9uV2lkdGggPSBwYXJzZUludChkZWZhdWx0QnV0dG9uV2lkdGgsIDEwKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xlZnRQb3NpdGlvblN0YXJ0ICsgKGluZGV4ICogKGJ1dHRvbldpZHRoICsgdGhpcy5fZGVmYXVsdEJ1dHRvblNwYWNlKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgYnV0dG9ucyBhbmQgZmllbGRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGRTdGF0aWNCdXR0b25zKCl7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVCdXR0b24odGhpcy5fYWN0aXZhdGVCdXR0b25JZCwgQnV0dG9uVGV4dHMuQWN0aXZhdGUsICB0aGlzLmdldEltYWdlUGF0aChcInBsYXkuc3ZnXCIpLCB0aGlzLl9kZWZhdWx0QnV0dG9uV2lkdGgxKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZUZpZWxkKHRoaXMuX3N0YXRlRmllbGRJZCk7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVCdXR0b24odGhpcy5fZm9yY2VTdGFydEJ1dHRvbklkLCBCdXR0b25UZXh0cy5Gb3JjZVN0YXJ0LCAgdGhpcy5nZXRJbWFnZVBhdGgoXCJyZWNvcmQuc3ZnXCIpLCB0aGlzLl9kZWZhdWx0QnV0dG9uV2lkdGgyKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZUJ1dHRvbih0aGlzLl9mb3JjZVN0b3BCdXR0b25JZCwgQnV0dG9uVGV4dHMuRm9yY2VTdG9wLCAgdGhpcy5nZXRJbWFnZVBhdGgoXCJzdG9wLnN2Z1wiKSwgdGhpcy5fZGVmYXVsdEJ1dHRvbldpZHRoMik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkcyB0aGUgc3R5bGVzIGZvciB0aGUgdHJhY2UgY29udHJvbCB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGxvYWRTdHlsZXMoKXtcclxuICAgICAgICBzdXBlci5hZGRTdHlsZShcIndpZGdldHMvdHJhY2VDb250cm9sV2lkZ2V0L3N0eWxlL2Nzcy90cmFjZUNvbnRyb2xTdHlsZS5jc3NcIik7XHJcbiAgICAgICAgc3VwZXIuYWRkU3R5bGUoXCJ3aWRnZXRzL3RyYWNlQ29udHJvbFdpZGdldC9zdHlsZS9jc3MvdHJhY2VDb250cm9sQnV0dG9uU3R5bGUuY3NzXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWN0aXZhdGVzL0RlYWN0aXZhdGVzIGEgYnV0dG9uXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBkZWFjdGl2YXRlXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGRlYWN0aXZhdGVCdXR0b24oaWQ6IHN0cmluZywgZGVhY3RpdmF0ZTogYm9vbGVhbil7XHJcbiAgICAgICAgdmFyIGVqQnV0dG9uID0gJChcIiNcIisgaWQpLmRhdGEoXCJlakJ1dHRvblwiKTtcclxuICAgICAgICBpZihlakJ1dHRvbiA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICB0aGlzLnNldEJ1dHRvbkNzc0NsYXNzKGVqQnV0dG9uLCBkZWFjdGl2YXRlKTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgYnV0dG9uRWxlbWVudCA9ICQoXCIjXCIgKyBpZClbMF07XHJcblxyXG4gICAgICAgIGxldCBpbWFnZVBhdGggPSB0aGlzLmdldEltYWdlUGF0aEZvcklkKGlkLCBkZWFjdGl2YXRlKTtcclxuICAgICAgICBidXR0b25FbGVtZW50LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IFwidXJsKCdcIiArIGltYWdlUGF0aCArXCInKVwiO1xyXG5cclxuICAgICAgICBEb21IZWxwZXIuZGlzYWJsZUVsZW1lbnQoYnV0dG9uRWxlbWVudCwgZGVhY3RpdmF0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBsYXlvdXQgb2YgdGhlIGJ1dHRvbihlLmcuIHRleHQsIHNpemUsIGxlZnQgcG9zdGlvbilcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYnV0dG9uVGV4dFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5ld1NpemVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuZXdMZWZ0UG9zaXRpb25cclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0QnV0dG9uTGF5b3V0KGlkOiBzdHJpbmcsIGJ1dHRvblRleHQ6IHN0cmluZywgbmV3U2l6ZTogc3RyaW5nLCBuZXdMZWZ0UG9zaXRpb246IHN0cmluZyl7XHJcbiAgICAgICAgdmFyIGVqQnV0dG9uID0gJChcIiNcIisgaWQpLmRhdGEoXCJlakJ1dHRvblwiKTtcclxuICAgICAgICBpZihlakJ1dHRvbiA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVqQnV0dG9uLm9wdGlvbihcInRleHRcIiwgYnV0dG9uVGV4dCwgdHJ1ZSk7XHJcbiAgICAgICAgaWYoYnV0dG9uVGV4dCA9PSBcIlwiKXtcclxuICAgICAgICAgICAgZWpCdXR0b24ub3B0aW9uKFwiY29udGVudFR5cGVcIiwgZWouQ29udGVudFR5cGUuSW1hZ2VPbmx5LCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgZWpCdXR0b24ub3B0aW9uKFwiY29udGVudFR5cGVcIiwgZWouQ29udGVudFR5cGUuVGV4dEFuZEltYWdlLCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWpCdXR0b24ub3B0aW9uKFwid2lkdGhcIiwgbmV3U2l6ZSwgdHJ1ZSk7XHJcblxyXG4gICAgICAgIGxldCBidXR0b25FbGVtZW50ID0gJChcIiNcIiArIGlkKVswXTtcclxuICAgICAgICBpZihidXR0b25FbGVtZW50ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGJ1dHRvbkVsZW1lbnQuc3R5bGUubGVmdCA9IG5ld0xlZnRQb3NpdGlvblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGltYWdlcGF0aCBmb3IgdGhlIGJ1dHRvbiBpZHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGJ1dHRvbklkXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGRlYWN0aXZhdGVcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0SW1hZ2VQYXRoRm9ySWQoYnV0dG9uSWQ6IHN0cmluZywgZGVhY3RpdmF0ZTogYm9vbGVhbik6IHN0cmluZ3tcclxuICAgICAgICBsZXQgaW1hZ2VQYXRoO1xyXG4gICAgICAgIGlmKGJ1dHRvbklkID09IHRoaXMuX2ZvcmNlU3RhcnRCdXR0b25JZCl7XHJcbiAgICAgICAgICAgIGltYWdlUGF0aCA9IHRoaXMuZ2V0SW1hZ2VQYXRoKFwicmVjb3JkLnN2Z1wiLCBkZWFjdGl2YXRlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihidXR0b25JZCA9PSB0aGlzLl9mb3JjZVN0b3BCdXR0b25JZCl7XHJcbiAgICAgICAgICAgIGltYWdlUGF0aCA9IHRoaXMuZ2V0SW1hZ2VQYXRoKFwic3RvcC5zdmdcIiwgZGVhY3RpdmF0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoYnV0dG9uSWQgPT0gdGhpcy5fc2F2ZVRyYWNlQ29uZmlndXJhdGlvbkJ1dHRvbklkKXtcclxuICAgICAgICAgICAgaW1hZ2VQYXRoID0gdGhpcy5nZXRJbWFnZVBhdGgoXCJzYXZlLnN2Z1wiLCBkZWFjdGl2YXRlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihidXR0b25JZCA9PSB0aGlzLl9hY3RpdmF0ZUJ1dHRvbklkKXtcclxuICAgICAgICAgICAgaW1hZ2VQYXRoID0gdGhpcy5nZXRJbWFnZVBhdGgoXCJwbGF5LnN2Z1wiLCBkZWFjdGl2YXRlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihidXR0b25JZCA9PSB0aGlzLl9pbXBvcnRUcmFjZUNvbmZpZ3VyYXRpb25CdXR0b25JZCl7XHJcbiAgICAgICAgICAgIGltYWdlUGF0aCA9IHRoaXMuZ2V0SW1hZ2VQYXRoKFwiaW1wb3J0LnN2Z1wiLCBkZWFjdGl2YXRlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihidXR0b25JZCA9PSB0aGlzLl9leHBvcnRUcmFjZUNvbmZpZ3VyYXRpb25CdXR0b25JZCl7XHJcbiAgICAgICAgICAgIGltYWdlUGF0aCA9IHRoaXMuZ2V0SW1hZ2VQYXRoKFwiZXhwb3J0LnN2Z1wiLCBkZWFjdGl2YXRlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGltYWdlUGF0aDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIEJ1dHRvbiBjc3Mgc3R5bGVzIGZvciBhY3RpdmF0ZWQgb3IgZGVhY3RpdmF0ZWQgc3RhdGVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBlakJ1dHRvblxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBkZWFjdGl2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0QnV0dG9uQ3NzQ2xhc3MoZWpCdXR0b24sIGRlYWN0aXZhdGU6IGJvb2xlYW4pe1xyXG4gICAgICAgIGlmKGRlYWN0aXZhdGUgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgIGVqQnV0dG9uLm9wdGlvbihcImNzc0NsYXNzXCIsIFwidHJhY2VDb250cm9sQnV0dG9uRGVhY3RpdmF0ZWRcIiwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGVqQnV0dG9uLm9wdGlvbihcImNzc0NsYXNzXCIsIFwidHJhY2VDb250cm9sQnV0dG9uXCIsIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBidXR0b24gd2l0aCB0aGUgZ2l2ZW4gdGV4dCBhbmQgaW1hZ2VcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaW1hZ2VQYXRoXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlQnV0dG9uKGlkOiBzdHJpbmcsIHRleHQ6IHN0cmluZywgaW1hZ2VQYXRoOiBzdHJpbmcsIHdpZHRoKXtcclxuICAgICAgICAoPGFueT4kKFwiI1wiICsgaWQpKS5lakJ1dHRvbih7XHJcbiAgICAgICAgICAgIHRleHQ6IHRleHQsXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBlai5Db250ZW50VHlwZS5UZXh0QW5kSW1hZ2UsXHJcbiAgICAgICAgICAgIGNzc0NsYXNzOiBcInRyYWNlQ29udHJvbEJ1dHRvblwiLFxyXG4gICAgICAgICAgICBwcmVmaXhJY29uOiBcImUtaWNvblwiLCAvL1NwZWNpZmllcyB0aGUgcHJpbWFyeSBpY29uIGZvciBCdXR0b25cclxuICAgICAgICAgICAgY2xpY2s6IChjbGlja0FyZ3MpID0+IHRoaXMuY2xpY2soaWQpLFxyXG4gICAgICAgICAgICB3aWR0aDogd2lkdGgsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCBidXR0b25FbGVtZW50ID0gJChcIiNcIiArIGlkKVswXTtcclxuICAgICAgICBidXR0b25FbGVtZW50LnN0eWxlLmJhY2tncm91bmRQb3NpdGlvblggPSBcIjRweFwiO1xyXG4gICAgICAgIGJ1dHRvbkVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZFBvc2l0aW9uWSA9IFwiNHB4XCI7XHJcbiAgICAgICAgYnV0dG9uRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcInVybCgnXCIgKyBpbWFnZVBhdGggK1wiJylcIjtcclxuICAgICAgICBidXR0b25FbGVtZW50LnN0eWxlLmJhY2tncm91bmRSZXBlYXQgPSBcIm5vLXJlcGVhdFwiO1xyXG4gICAgICAgIGJ1dHRvbkVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZFNpemUgPSBcIjE2cHggMTZweFwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVzdHJveXMgdGhlIGJ1dHRvbiBvYmplY3RcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBkZXN0cm95QnV0dG9uKGlkOiBzdHJpbmcpe1xyXG4gICAgICAgIGxldCBidXR0b24gPSAkKFwiI1wiICsgaWQpLmRhdGEoXCJlakJ1dHRvblwiKTtcclxuICAgICAgICBpZihidXR0b24gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgYnV0dG9uLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiBcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgdHJhY2Ugc3RhdGUgZmllbGQgKGN1cnJlbnRseSBhIHNwZWNpYWwgYnV0dG9uIGlzIHVzZWQpXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlRmllbGQoaWQ6IHN0cmluZyl7XHJcbiAgICAgICAgKDxhbnk+JChcIiNcIiArIGlkKSkuZWpCdXR0b24oe1xyXG4gICAgICAgICAgICB0ZXh0OiBcIjBcIixcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IGVqLkNvbnRlbnRUeXBlLlRleHRPbmx5LFxyXG4gICAgICAgICAgICBjc3NDbGFzczogXCJ0cmFjZVN0YXRlQnV0dG9uXCIsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCBmaWVsZEVsZW1lbnQgPSAkKFwiI1wiICsgaWQpWzBdO1xyXG4gICAgICAgIGlmKGZpZWxkRWxlbWVudCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBmaWVsZEVsZW1lbnQuc3R5bGUuY29sb3IgPSBcIiNGRkZGRkZcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZXN0cm95cyB0aGUgZmllbGQgb2JqZWN0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZGVzdHJveUZpZWxkKGlkOiBzdHJpbmcpe1xyXG4gICAgICAgIGxldCBmaWVsZCA9ICQoXCIjXCIgKyBpZCkuZGF0YShcImVqQnV0dG9uXCIpO1xyXG4gICAgICAgIGlmKGZpZWxkICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGZpZWxkLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXNpemVzIHRoZSB0cmFjZSBjb250cm9sIHdpZGdldFxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gd2lkdGhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHRcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcmVzaXplKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKXtcclxuXHJcbiAgICAgICAgdGhpcy5fYWN0dWFsSGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuX2FjdHVhbFdpZHRoID0gd2lkdGg7XHJcblxyXG4gICAgICAgICQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpWzBdLnN0eWxlLndpZHRoID0gd2lkdGgudG9TdHJpbmcoKSArIFwicHhcIjtcclxuICAgICAgICAkKHRoaXMuY3NzUGFyZW50Q29udGVudElkKVswXS5zdHlsZS5oZWlnaHQgPSBoZWlnaHQudG9TdHJpbmcoKSArIFwicHhcIjtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnVwZGF0ZUR5bmFtaWNMYXlvdXQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIGR5bmFtaWMgbGF5b3V0IChlLmcuIHNtYWxsZXIgYnV0dG9ucyBpZiBzbWFsbCB3aWRnZXQgc2l6ZSlcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZUR5bmFtaWNMYXlvdXQoKXtcclxuICAgICAgICBsZXQgbmVlZGVkU2l6ZUZvckRlZmF1bHRMYXlvdXQgPSAxNDAwO1xyXG4gICAgICAgIGxldCBuZWVkZWRTaXplRm9yTWluaW16ZWRMYXlvdXRTdGVwMSA9IDEwMDA7XHJcbiAgICAgICAgaWYodGhpcy5fYWN0dWFsV2lkdGggPiBuZWVkZWRTaXplRm9yRGVmYXVsdExheW91dCl7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0TGF5b3V0KExheW91dFN0eWxlLkRlZmF1bHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHRoaXMuX2FjdHVhbFdpZHRoID4gbmVlZGVkU2l6ZUZvck1pbmltemVkTGF5b3V0U3RlcDEpe1xyXG4gICAgICAgICAgICB0aGlzLnNldExheW91dChMYXlvdXRTdHlsZS5NaW5pbWl6ZVN0ZXAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5zZXRMYXlvdXQoTGF5b3V0U3R5bGUuTWluaW1pemVTdGVwMik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgZHluYW1pYyBsYXlvdXQgdG8gYSBkZWZpbmVkIGxheW91dCBzdHlsZSAoZS5nLiBkZWZhdWx0IG9yIG1pbmltaXplZClcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtMYXlvdXRTdHlsZX0gbGF5b3V0U3R5bGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRMYXlvdXQobGF5b3V0U3R5bGU6IExheW91dFN0eWxlKXtcclxuICAgICAgICBzd2l0Y2gobGF5b3V0U3R5bGUpe1xyXG4gICAgICAgICAgICBjYXNlIExheW91dFN0eWxlLk1pbmltaXplU3RlcDI6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0QnV0dG9uTGF5b3V0KHRoaXMuX3NhdmVUcmFjZUNvbmZpZ3VyYXRpb25CdXR0b25JZCwgXCJcIiwgdGhpcy5fZGVmYXVsdEJ1dHRvbldpZHRoM01pbmltaXplZFN0ZXAyLCB0aGlzLmdldExlZnRQb3NpdGlvbigwLCBMYXlvdXRTdHlsZS5NaW5pbWl6ZVN0ZXAyKSArIFwicHhcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEJ1dHRvbkxheW91dCh0aGlzLl9pbXBvcnRUcmFjZUNvbmZpZ3VyYXRpb25CdXR0b25JZCwgXCJcIiwgdGhpcy5fZGVmYXVsdEJ1dHRvbldpZHRoM01pbmltaXplZFN0ZXAyLCB0aGlzLmdldExlZnRQb3NpdGlvbigxLCBMYXlvdXRTdHlsZS5NaW5pbWl6ZVN0ZXAyKSArIFwicHhcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEJ1dHRvbkxheW91dCh0aGlzLl9leHBvcnRUcmFjZUNvbmZpZ3VyYXRpb25CdXR0b25JZCwgXCJcIiwgdGhpcy5fZGVmYXVsdEJ1dHRvbldpZHRoM01pbmltaXplZFN0ZXAyLCB0aGlzLmdldExlZnRQb3NpdGlvbigyLCBMYXlvdXRTdHlsZS5NaW5pbWl6ZVN0ZXAyKSArIFwicHhcIik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIExheW91dFN0eWxlLk1pbmltaXplU3RlcDE6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0QnV0dG9uTGF5b3V0KHRoaXMuX3NhdmVUcmFjZUNvbmZpZ3VyYXRpb25CdXR0b25JZCwgQnV0dG9uVGV4dHMuU2F2ZVRyYWNlQ29uZmlndXJhdGlvbk1pbmltaXplZCwgdGhpcy5fZGVmYXVsdEJ1dHRvbldpZHRoM01pbmltaXplZFN0ZXAxLCB0aGlzLmdldExlZnRQb3NpdGlvbigwLCBMYXlvdXRTdHlsZS5NaW5pbWl6ZVN0ZXAxKSArIFwicHhcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEJ1dHRvbkxheW91dCh0aGlzLl9pbXBvcnRUcmFjZUNvbmZpZ3VyYXRpb25CdXR0b25JZCwgQnV0dG9uVGV4dHMuSW1wb3J0VHJhY2VDb25maWd1cmF0aW9uTWluaW1pemVkLCB0aGlzLl9kZWZhdWx0QnV0dG9uV2lkdGgzTWluaW1pemVkU3RlcDEsIHRoaXMuZ2V0TGVmdFBvc2l0aW9uKDEsIExheW91dFN0eWxlLk1pbmltaXplU3RlcDEpICsgXCJweFwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0QnV0dG9uTGF5b3V0KHRoaXMuX2V4cG9ydFRyYWNlQ29uZmlndXJhdGlvbkJ1dHRvbklkLCBCdXR0b25UZXh0cy5FeHBvcnRUcmFjZUNvbmZpZ3VyYXRpb25NaW5pbWl6ZWQsIHRoaXMuX2RlZmF1bHRCdXR0b25XaWR0aDNNaW5pbWl6ZWRTdGVwMSwgdGhpcy5nZXRMZWZ0UG9zaXRpb24oMiwgTGF5b3V0U3R5bGUuTWluaW1pemVTdGVwMSkgKyBcInB4XCIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBMYXlvdXRTdHlsZS5EZWZhdWx0OiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEJ1dHRvbkxheW91dCh0aGlzLl9zYXZlVHJhY2VDb25maWd1cmF0aW9uQnV0dG9uSWQsIEJ1dHRvblRleHRzLlNhdmVUcmFjZUNvbmZpZ3VyYXRpb24sIHRoaXMuX2RlZmF1bHRCdXR0b25XaWR0aDMsIHRoaXMuZ2V0TGVmdFBvc2l0aW9uKDApICsgXCJweFwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0QnV0dG9uTGF5b3V0KHRoaXMuX2ltcG9ydFRyYWNlQ29uZmlndXJhdGlvbkJ1dHRvbklkLCBCdXR0b25UZXh0cy5JbXBvcnRUcmFjZUNvbmZpZ3VyYXRpb24sIHRoaXMuX2RlZmF1bHRCdXR0b25XaWR0aDMsIHRoaXMuZ2V0TGVmdFBvc2l0aW9uKDEpICtcInB4XCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRCdXR0b25MYXlvdXQodGhpcy5fZXhwb3J0VHJhY2VDb25maWd1cmF0aW9uQnV0dG9uSWQsIEJ1dHRvblRleHRzLkV4cG9ydFRyYWNlQ29uZmlndXJhdGlvbiwgdGhpcy5fZGVmYXVsdEJ1dHRvbldpZHRoMywgdGhpcy5nZXRMZWZ0UG9zaXRpb24oMikgKyBcInB4XCIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogU2V0cyBhbmQgZGVmaW5lcyB0aGUgaW50ZXJmYWNlIHRvIHRoZSB0cmFjZSBjb250cm9sXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IHRyYWNlQ29udHJvbEludGVyZmFjZSh0cmFjZUNvbXBvbmVudENvbnRyb2w6IElUcmFjZUNvbXBvbmVudENvbnRyb2wpIHtcclxuICAgICAgICB0aGlzLl90cmFjZUNvbnRyb2xJbnRlcmZhY2UgPSB0cmFjZUNvbXBvbmVudENvbnRyb2w7XHJcbiAgICAgICAgaWYodGhpcy5fdHJhY2VDb250cm9sSW50ZXJmYWNlKXtcclxuICAgICAgICAgICAgdGhpcy5hZGREeW5hbWljQnV0dG9uc0ZvckF2YWlsYWJsZUNvbW1hbmRzKHRoaXMuX3RyYWNlQ29udHJvbEludGVyZmFjZSk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkVHJhY2VTdGF0ZSh0aGlzLl90cmFjZUNvbnRyb2xJbnRlcmZhY2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZCB0cmFjZSBzdGF0ZSBpbmZvIHRvIGxheW91dFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHRyYWNlQ29udHJvbEludGVyZmFjZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkZFRyYWNlU3RhdGUodHJhY2VDb250cm9sSW50ZXJmYWNlKXtcclxuICAgICAgICB0aGlzLmNyZWF0ZUZpZWxkKHRoaXMuX3N0YXRlRmllbGRJZCk7XHJcblxyXG4gICAgICAgIHRoaXMucmVmcmVzaFRyYWNlQ29udHJvbFBhcmFtZXRlclZhbHVlKHRoaXMuX2FjdHVhbFRyYWNlU3RhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyB0aGUgZHluYW1pYyBidXR0b25zIChzYXZlL2ltcG9ydC9leHBvcnQgdHJhY2UgY29uZmlndWF0aW9uKSBpZiBjb21tYW5kIGlzIGF2YWlsYWJsZSBpbiBjb21tYW5kIGludGVyZmFjZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGNvbW1hbmRzXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkRHluYW1pY0J1dHRvbnNGb3JBdmFpbGFibGVDb21tYW5kcyhjb21tYW5kcyl7XHJcbiAgICAgICAgaWYoY29tbWFuZHMuY29tbWFuZFNhdmVDb25maWd1cmF0aW9uKXtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVCdXR0b24odGhpcy5fc2F2ZVRyYWNlQ29uZmlndXJhdGlvbkJ1dHRvbklkLCBCdXR0b25UZXh0cy5TYXZlVHJhY2VDb25maWd1cmF0aW9uLCB0aGlzLmdldEltYWdlUGF0aChcInNhdmUuc3ZnXCIpLCB0aGlzLl9kZWZhdWx0QnV0dG9uV2lkdGgzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoY29tbWFuZHMuY29tbWFuZEltcG9ydFRyYWNlQ29uZmlndXJhdGlvbil7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQnV0dG9uKHRoaXMuX2ltcG9ydFRyYWNlQ29uZmlndXJhdGlvbkJ1dHRvbklkLCBCdXR0b25UZXh0cy5JbXBvcnRUcmFjZUNvbmZpZ3VyYXRpb24sICB0aGlzLmdldEltYWdlUGF0aChcImltcG9ydC5zdmdcIiksIHRoaXMuX2RlZmF1bHRCdXR0b25XaWR0aDMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihjb21tYW5kcy5jb21tYW5kRXhwb3J0VHJhY2VDb25maWd1cmF0aW9uKXtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVCdXR0b24odGhpcy5fZXhwb3J0VHJhY2VDb25maWd1cmF0aW9uQnV0dG9uSWQsIEJ1dHRvblRleHRzLkV4cG9ydFRyYWNlQ29uZmlndXJhdGlvbiwgIHRoaXMuZ2V0SW1hZ2VQYXRoKFwiZXhwb3J0LnN2Z1wiKSwgdGhpcy5fZGVmYXVsdEJ1dHRvbldpZHRoMylcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gVXBkYXRlIGxheW91dCBhZnRlciBhZGRpbmcgbmV3IGJ1dHRvbnNcclxuICAgICAgICB0aGlzLnVwZGF0ZUR5bmFtaWNMYXlvdXQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFdpbGwgYmUgY2FsbGVkIHdoZW4gYSBidXR0b24gd2FzIGNsaWNrZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBidXR0b25JZFxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNsaWNrKGJ1dHRvbklkKXtcclxuXHJcbiAgICAgICAgc3dpdGNoKGJ1dHRvbklkKXtcclxuICAgICAgICAgICAgY2FzZSB0aGlzLl9hY3RpdmF0ZUJ1dHRvbklkOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5leGVjdXRlQWN0aXZhdGUoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIHRoaXMuX2ZvcmNlU3RhcnRCdXR0b25JZDogICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5leGVjdXRlRm9yY2VTdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgdGhpcy5fZm9yY2VTdG9wQnV0dG9uSWQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmV4ZWN1dGVGb3JjZVN0b3AoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIHRoaXMuX3NhdmVUcmFjZUNvbmZpZ3VyYXRpb25CdXR0b25JZDpcclxuICAgICAgICAgICAgICAgIHRoaXMuZXhlY3V0ZVNhdmVDb25maWd1cmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSB0aGlzLl9pbXBvcnRUcmFjZUNvbmZpZ3VyYXRpb25CdXR0b25JZDpcclxuICAgICAgICAgICAgICAgIHRoaXMuaW1wb3J0VHJhY2VDb25maWd1cmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSB0aGlzLl9leHBvcnRUcmFjZUNvbmZpZ3VyYXRpb25CdXR0b25JZDpcclxuICAgICAgICAgICAgICAgIHRoaXMuZXhwb3J0VHJhY2VDb25maWd1cmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBY3RpdmF0ZXMgdGhlIHRyYWNlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBleGVjdXRlQWN0aXZhdGUoKXtcclxuICAgICAgICAvLyBpbnZva2UgYWN0aXZhdGUgdHJhY2UgYnkgdXNpbmcgYSBjb21wb25lbnQgY29tbWFuZFxyXG4gICAgICAgIGlmKHRoaXMuX3NhdmVDb25maWdJc0FjdGl2ZSA9PSBmYWxzZSl7ICBcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2FjdGl2YXRlSXNBY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnNldEJ1dHRvblN0YXRlcyh0aGlzLl90cmFjZUNvbnRyb2xJbnRlcmZhY2UhLnRyYWNlU3RhdGUudmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5hY3RpdmF0ZVRyYWNlKCk7ICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhY3RpdmF0ZVRyYWNlKCkge1xyXG4gICAgICAgIC8vIEJJTkRJTkdTT1VSQ0U6IGRpc3BhdGNoZXMgdGhlIG10aG9kIHRvIGJvdW5kIHRhcmdldHNcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFByb2Nlc3NlcyB0cmFjZSBhY3RpdmF0aW9uIHJlc3BvbnNlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvblRyYWNlQWN0aXZhdGVkKCkge1xyXG4gICAgICAgIHRoaXMuX2FjdGl2YXRlSXNBY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNldEJ1dHRvblN0YXRlcyh0aGlzLl9hY3R1YWxUcmFjZVN0YXRlKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBoYW5kbGVzIHRyYWNlIHN0YXRlIGNoYW5nZXNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IHRyYWNlU3RhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvblRyYWNlU3RhdGVDaGFuZ2VkKHRyYWNlU3RhdGU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2FjdHVhbFRyYWNlU3RhdGUgPSB0cmFjZVN0YXRlOyBcclxuICAgICAgICB0aGlzLnJlZnJlc2hUcmFjZUNvbnRyb2xQYXJhbWV0ZXJWYWx1ZSh0cmFjZVN0YXRlKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGb3JjZXMgc3RhcnRpbmcgdGhlIHRyYWNlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBleGVjdXRlRm9yY2VTdGFydCgpe1xyXG4gICAgICAgIGlmICh0aGlzLl90cmFjZUNvbnRyb2xJbnRlcmZhY2UpIHtcclxuICAgICAgICAgICAgaWYodGhpcy5fYWN0dWFsVHJhY2VTdGF0ZSA9PSBUcmFjZVN0YXRlSWRzLldhaXRfc3RhcnRfdHJpZ2dlcil7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90cmFjZUNvbnRyb2xJbnRlcmZhY2UuY29tbWFuZEZvcmNlU3RhcnQuZXhlY3V0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRm9yY2VzIHN0b3BwaW5nIHRoZSB0cmFjZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZXhlY3V0ZUZvcmNlU3RvcCgpe1xyXG4gICAgICAgIGlmICh0aGlzLl90cmFjZUNvbnRyb2xJbnRlcmZhY2UpIHtcclxuICAgICAgICAgICAgaWYodGhpcy5fYWN0dWFsVHJhY2VTdGF0ZSA9PSBUcmFjZVN0YXRlSWRzLldhaXRfc3RvcF9ldmVudCl7IC8vIE9ubHkgd2hpbGUgcnVubmluZ1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdHJhY2VDb250cm9sSW50ZXJmYWNlLmNvbW1hbmRGb3JjZVN0b3AuZXhlY3V0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2F2ZXMgdGhlIHRyYWNlIGNvbmZpZ3VyYXRpb24gb24gdGFyZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBleGVjdXRlU2F2ZUNvbmZpZ3VyYXRpb24oKXtcclxuICAgICAgICBpZiAodGhpcy5fdHJhY2VDb250cm9sSW50ZXJmYWNlKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuc2F2ZVRyYWNlQ29uZmlnUG9zc2libGVJblRoaXNTdGF0ZSh0aGlzLl9hY3R1YWxUcmFjZVN0YXRlKSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zYXZlQ29uZmlnSXNBY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRCdXR0b25TdGF0ZXModGhpcy5fdHJhY2VDb250cm9sSW50ZXJmYWNlIS50cmFjZVN0YXRlLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3RyYWNlQ29udHJvbEludGVyZmFjZS5jb21tYW5kU2F2ZUNvbmZpZ3VyYXRpb24uZXhlY3V0ZShudWxsLChyZXN1bHQpID0+e1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NhdmVDb25maWdJc0FjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0QnV0dG9uU3RhdGVzKHRoaXMuX3RyYWNlQ29udHJvbEludGVyZmFjZSEudHJhY2VTdGF0ZS52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE9wZW5zIGEgZmlsZSBzZWxlY3QgZGlhbG9nIGFuZCBpbXBvcnRzIGEgdHJhY2UgY29uZmlndXJhdGlvbiBmcm9tIHRoZSBmaWxlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpbXBvcnRUcmFjZUNvbmZpZ3VyYXRpb24oKXtcclxuICAgICAgICB0aGlzLl9maWxlUHJvdmlkZXIuZXZlbnRVcGxvYWREYXRhRmluaXNoZWQuYXR0YWNoKHRoaXMuX3VwbG9hZERhdGFGaW5pc2hlZEhhbmRsZXIpO1xyXG4gICAgICAgIHRoaXMuX2ZpbGVQcm92aWRlci51cGxvYWREYXRhKFwiLnRyYWNlY2ZnXCIpOyAvLyBPbmx5IHNob3cvYWNjZXB0ICoudHJhY2VjZmcgZmlsZXNcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEV4cG9ydCBhIHRyYWNlIGNvbmZpZ3VyYXRpb24gdG8gYSBmaWxlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBleHBvcnRUcmFjZUNvbmZpZ3VyYXRpb24oKXtcclxuXHJcbiAgICAgICAgdGhpcy5fdHJhY2VDb250cm9sSW50ZXJmYWNlIS5jb21tYW5kRXhwb3J0VHJhY2VDb25maWd1cmF0aW9uLmV4ZWN1dGUobnVsbCwocmVzdWx0KSA9PntcclxuICAgICAgICAgICAgdmFyIGJsb2IgPSBuZXcgQmxvYihbcmVzdWx0XSwgeyB0eXBlOiBcInRleHQveG1sXCIgfSk7XHJcbiAgICAgICAgICAgIEZpbGVQcm92aWRlci5kb3dubG9hZERhdGEoXCJUcmFjZUNvbmZpLnRyYWNlY2ZnXCIsIGJsb2IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSAgXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBPY2N1cnMgYWZ0ZXIgcmVhZGluZyBkYXRhIGZyb20gZmlsZSh0cmFjZSBjb25maWd1cmF0aW9uIGltcG9ydCBkYXRhKVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0hUTUxJbnB1dEVsZW1lbnR9IHNlbmRlclxyXG4gICAgICogQHBhcmFtIHtNYXA8c3RyaW5nLCBzdHJpbmc+fSBhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25VcGxvYWREYXRhRmluaXNoZWQoc2VuZGVyOiBIVE1MSW5wdXRFbGVtZW50LCBhcmdzOiBNYXA8c3RyaW5nLCBzdHJpbmc+KXtcclxuXHRcdC8qdGhpcy5zZXRCdXN5SW5mb3JtYXRpb24obmV3IEJ1c3lJbmZvcm1hdGlvbihcIkltcG9ydGluZyBkYXRhLi4uXCIsIEltYWdlSWQuZGVmYXVsdEltYWdlLCA0OCwgdHJ1ZSkpO1xyXG5cdFx0dGhpcy5zZXRCdXN5KHRydWUpOyovXHJcblx0XHRcclxuXHRcdC8vIFRpbWVvdXQgbmVlZGVkIHRvIHNob3cgdGhlIGJ1c3lzY3JlZW4gYmVmb3JlIGltcG9ydGluZyBkYXRhIFxyXG5cdFx0c2V0VGltZW91dCgoKSA9PiB0aGlzLmltcG9ydERhdGEoc2VuZGVyLCBhcmdzKSwgMjAwKTtcclxuXHJcblx0XHR0aGlzLl9maWxlUHJvdmlkZXIuZXZlbnRVcGxvYWREYXRhRmluaXNoZWQuZGV0YWNoKHRoaXMuX3VwbG9hZERhdGFGaW5pc2hlZEhhbmRsZXIpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuXHQgKiBpbXBvcnRzIHRoZSBnaXZlbiBmaWxlZGF0YSB3aXRoIHRoZSBnaXZlbiBmaWxlbmFtZVxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcGFyYW0ge0hUTUxJbnB1dEVsZW1lbnR9IGZpbGVJbnB1dEVsZW1lbnRcclxuXHQgKiBAcGFyYW0ge01hcDxzdHJpbmcsIHN0cmluZz59IGZpbGVDb250ZW50c1xyXG5cdCAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIGltcG9ydERhdGEoZmlsZUlucHV0RWxlbWVudDogSFRNTElucHV0RWxlbWVudCwgZmlsZUNvbnRlbnRzOiBNYXA8c3RyaW5nLCBzdHJpbmc+KXtcclxuICAgICAgICBcclxuICAgICAgICBpZihmaWxlQ29udGVudHMuc2l6ZSA9PT0gMSl7XHJcbiAgICAgICAgICAgIGxldCBmaWxlZGF0YSA9IGZpbGVDb250ZW50cy52YWx1ZXMoKS5uZXh0KCkudmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuX3RyYWNlQ29udHJvbEludGVyZmFjZSEuY29tbWFuZEltcG9ydFRyYWNlQ29uZmlndXJhdGlvbi5leGVjdXRlKGZpbGVkYXRhLChyZXN1bHQpID0+e1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cdH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlZnJlc2hlcyB0aGUgdHJhY2Ugc3RhdGUgKGRpc3BsYXluYW1lIG9mIHZhbHVlIGFuZCB0aGUgc3RhdGUgaWNvbilcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcn0gdHJhY2VDb250cm9sUGFyYW1ldGVyXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVmcmVzaFRyYWNlQ29udHJvbFBhcmFtZXRlclZhbHVlKHRyYWNlU3RhdGU6IHN0cmluZykgeyAgIFxyXG4gICAgICAgIHRoaXMuc2V0VHJhY2VTdGF0ZVRleHQodHJhY2VTdGF0ZSk7XHJcbiAgICAgICAgdGhpcy5zZXRUcmFjZVN0YXRlSW1hZ2UodHJhY2VTdGF0ZSk7XHJcbiAgICAgICAgdGhpcy5zZXRCdXR0b25TdGF0ZXModHJhY2VTdGF0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgdGhlIGRpc3BsYXkgbmFtZSBmb3IgdGhlIHRyYWNlIHN0YXRlIGluIHRoZSB2aXN1YWxpemF0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0cmFjZVN0YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0VHJhY2VTdGF0ZVRleHQodHJhY2VTdGF0ZTogc3RyaW5nKXtcclxuICAgICAgICAvLyBHZXQgZGlzcGxheSBuYW1lIGZvciB0aGUgdHJhY2Ugc3RhdGVcclxuICAgICAgICBsZXQgdHJhY2VTdGF0ZURpc3BsYXlUZXh0ID0gXCJJbmFjdGl2ZVwiO1xyXG4gICAgICAgIGlmKHRyYWNlU3RhdGUgPT0gVHJhY2VTdGF0ZUlkcy5Db25maWdfcHJvY2Vzc2luZyB8fCB0cmFjZVN0YXRlID09IFRyYWNlU3RhdGVJZHMuQ29uZmlnX2FwcGxpZWQpe1xyXG4gICAgICAgICAgICB0cmFjZVN0YXRlRGlzcGxheVRleHQgPSBcIkFwcGx5aW5nIGNvbmZpZ3VyYXRpb25cIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih0cmFjZVN0YXRlID09IFRyYWNlU3RhdGVJZHMuV2FpdF9zdGFydF90cmlnZ2VyKXtcclxuICAgICAgICAgICAgdHJhY2VTdGF0ZURpc3BsYXlUZXh0ID0gXCJXYWl0IGZvciBzdGFydCB0cmlnZ2VyXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodHJhY2VTdGF0ZSA9PSBUcmFjZVN0YXRlSWRzLldhaXRfc3RvcF9ldmVudCl7XHJcbiAgICAgICAgICAgIHRyYWNlU3RhdGVEaXNwbGF5VGV4dCA9IFwiUnVubmluZ1wiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHRyYWNlU3RhdGUgPT0gVHJhY2VTdGF0ZUlkcy5EYXRhX2F2YWlsYWJsZSl7XHJcbiAgICAgICAgICAgIHRyYWNlU3RhdGVEaXNwbGF5VGV4dCA9IFwiRGF0YSBhdmFpbGFibGVcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih0cmFjZVN0YXRlID09IFRyYWNlU3RhdGVJZHMuUmVjb3JkX2ZhaWx1cmUpe1xyXG4gICAgICAgICAgICB0cmFjZVN0YXRlRGlzcGxheVRleHQgPSBcIlJlY29yZCBmYWlsZWRcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gU2V0IGRpc3BsYXkgbmFtZSBmb3IgdGhlIHRyYWNlIHN0YXRlXHJcbiAgICAgICAgKDxhbnk+JChcIiNcIiArIHRoaXMuX3N0YXRlRmllbGRJZCkpLmVqQnV0dG9uKHtcclxuICAgICAgICAgICAgdGV4dDogIHRyYWNlU3RhdGVEaXNwbGF5VGV4dCxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgYW4gaW1hZ2UgZm9yIHRoZSB0cmFjZSBzdGF0ZSBpbiB0aGUgdmlzdWFsaXphdGlvblxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHJhY2VTdGF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldFRyYWNlU3RhdGVJbWFnZSh0cmFjZVN0YXRlOnN0cmluZyl7XHJcbiAgICAgICAgLy8gR2V0IGltYWdlIGZvciB0aGUgdHJhY2Ugc3RhdGVcclxuICAgICAgICBsZXQgaW1hZ2VwYXRoID0gIHRoaXMuZ2V0SW1hZ2VQYXRoKFwiaW5hY3RpdmUuc3ZnXCIpO1xyXG4gICAgICAgIGlmKHRyYWNlU3RhdGUgPT1UcmFjZVN0YXRlSWRzLldhaXRfc3RhcnRfdHJpZ2dlcil7IFxyXG4gICAgICAgICAgICBpbWFnZXBhdGggPSAgdGhpcy5nZXRJbWFnZVBhdGgoXCJ3YWl0X3N0YXJ0X3RyaWdnZXIuc3ZnXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHRyYWNlU3RhdGUgPT0gVHJhY2VTdGF0ZUlkcy5XYWl0X3N0b3BfZXZlbnQpe1xyXG4gICAgICAgICAgICBpbWFnZXBhdGggPSAgdGhpcy5nZXRJbWFnZVBhdGgoXCJ3YWl0X3N0b3BfZXZlbnQuc3ZnXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHRyYWNlU3RhdGUgPT0gVHJhY2VTdGF0ZUlkcy5EYXRhX2F2YWlsYWJsZSl7XHJcbiAgICAgICAgICAgIGltYWdlcGF0aCA9ICB0aGlzLmdldEltYWdlUGF0aChcImRhdGFfYXZhaWxhYmxlLnN2Z1wiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFNldCBpbWFnZSBmb3IgdGhlIHRyYWNlIHN0YXRlXHJcbiAgICAgICAgbGV0IGltYWdlRWxlbWVudCA9ICQoXCIjXCIgKyB0aGlzLl9zdGF0ZUltYWdlKVswXTtcclxuICAgICAgICBpZihpbWFnZUVsZW1lbnQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgaW1hZ2VFbGVtZW50LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IFwidXJsKCdcIiArIGltYWdlcGF0aCArXCInKVwiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHN0YXRlcyhlbmFibGVkL2Rpc2FibGVkKSBvZiB0aGUgYnV0dG9ucyBmb3IgdGhlIGdpdmVuIHRyYWNlIHN0YXRlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0cmFjZVN0YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0QnV0dG9uU3RhdGVzKHRyYWNlU3RhdGU6IHN0cmluZyl7XHJcbiAgICAgICAgaWYodHJhY2VTdGF0ZSA9PSBUcmFjZVN0YXRlSWRzLldhaXRfc3RhcnRfdHJpZ2dlcil7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0QnV0dG9uU3RhdGVJbldhaXRTdGFydFRyaWdnZXJTdGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHRyYWNlU3RhdGUgPT0gVHJhY2VTdGF0ZUlkcy5XYWl0X3N0b3BfZXZlbnQpe1xyXG4gICAgICAgICAgICB0aGlzLnNldEJ1dHRvblN0YXRlSW5XYWl0U3RvcEV2ZW50U3RhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgaWYodGhpcy5zYXZlVHJhY2VDb25maWdQb3NzaWJsZUluVGhpc1N0YXRlKHRyYWNlU3RhdGUpKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVhY3RpdmF0ZUJ1dHRvbih0aGlzLl9zYXZlVHJhY2VDb25maWd1cmF0aW9uQnV0dG9uSWQsIGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBvdGhlciBzdGF0ZSA9PiBkZWFjdGl2YXRlIGZvcmNlIHN0YXJ0IHRyaWdnZXIgYW5kIGZvcmNlIHN0b3AgZXZlbnRcclxuICAgICAgICAgICAgdGhpcy5kZWFjdGl2YXRlQnV0dG9uKHRoaXMuX2ZvcmNlU3RhcnRCdXR0b25JZCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuZGVhY3RpdmF0ZUJ1dHRvbih0aGlzLl9mb3JjZVN0b3BCdXR0b25JZCwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBzZXQgYWN0aXZhdGUgYnV0dG9uIHN0YXRlXHJcbiAgICAgICAgICAgIGlmKHRoaXMuX2FjdGl2YXRlSXNBY3RpdmUgPT0gZmFsc2UgJiYgdGhpcy5fc2F2ZUNvbmZpZ0lzQWN0aXZlID09IGZhbHNlKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVhY3RpdmF0ZUJ1dHRvbih0aGlzLl9hY3RpdmF0ZUJ1dHRvbklkLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVhY3RpdmF0ZUJ1dHRvbih0aGlzLl9hY3RpdmF0ZUJ1dHRvbklkLCB0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBidXR0b24gc3RhdGVzIGlmIHRoZSB0cmFjZSBzdGF0ZSBpcyB3YWl0aW5nIGZvciBzdGFydCB0cmlnZ2VyXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRCdXR0b25TdGF0ZUluV2FpdFN0YXJ0VHJpZ2dlclN0YXRlKCl7XHJcbiAgICAgICAgLy8gV2FpdCBmb3Igc3RhcnQgdHJpZ2dlciA9PiBhY3RpdmF0ZSBmb3JjZSBzdGFydDsgZGVhY3RpdmF0ZSBmb3JjZSBzdG9wIGV2ZW50XHJcbiAgICAgICAgdGhpcy5kZWFjdGl2YXRlQnV0dG9uKHRoaXMuX2ZvcmNlU3RhcnRCdXR0b25JZCwgZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuZGVhY3RpdmF0ZUJ1dHRvbih0aGlzLl9mb3JjZVN0b3BCdXR0b25JZCwgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5kZWFjdGl2YXRlQnV0dG9uKHRoaXMuX3NhdmVUcmFjZUNvbmZpZ3VyYXRpb25CdXR0b25JZCwgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBidXR0b24gc3RhdGVzIGlmIHRoZSB0cmFjZSBzdGF0ZSBpcyB3YWl0aW5nIGZvciB0aGUgc3RvcCBldmVudFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0QnV0dG9uU3RhdGVJbldhaXRTdG9wRXZlbnRTdGF0ZSgpe1xyXG4gICAgICAgIC8vIFJ1bm5pbmcgPT4gZGVhY3RpdmF0ZSBmb3JjZSBzdGFydCB0cmlnZ2VyOyBhY3RpdmF0ZSBmb3JjZSBzdG9wIGV2ZW50XHJcbiAgICAgICAgdGhpcy5kZWFjdGl2YXRlQnV0dG9uKHRoaXMuX2ZvcmNlU3RhcnRCdXR0b25JZCwgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5kZWFjdGl2YXRlQnV0dG9uKHRoaXMuX2ZvcmNlU3RvcEJ1dHRvbklkLCBmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5kZWFjdGl2YXRlQnV0dG9uKHRoaXMuX3NhdmVUcmFjZUNvbmZpZ3VyYXRpb25CdXR0b25JZCwgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBpbWFnZVBhdGggZm9yIHRoZSBnaXZlbiBpbWFnZU5hbWUgYW5kIHN0YXRlKGFjdGl2YXRlZC9kZWFjdGl2YXRlZClcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGltYWdlTmFtZVxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbZGVhY3RpdmF0ZWQ9ZmFsc2VdXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldEltYWdlUGF0aChpbWFnZU5hbWU6IHN0cmluZywgZGVhY3RpdmF0ZWQ6IGJvb2xlYW4gPSBmYWxzZSk6c3RyaW5ne1xyXG4gICAgICAgIGlmKGRlYWN0aXZhdGVkID09IHRydWUpe1xyXG4gICAgICAgICAgICBpbWFnZU5hbWUgPSBpbWFnZU5hbWUucmVwbGFjZShcIi5zdmdcIiwgXCJfZGVhY3RpdmF0ZWQuc3ZnXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gVGhlbWVQcm92aWRlci5nZXRJbnN0YW5jZSgpLmdldFRoZW1lZEZpbGVQYXRoKFwid2lkZ2V0cy90cmFjZUNvbnRyb2xXaWRnZXQvc3R5bGUvaW1hZ2VzL1wiICsgaW1hZ2VOYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybiB0cnVlIGlmIHNhdmVpbmcgb2YgdHJhY2UgY29uZmlndXJhdGlvbiBpcyBwb3NzaWJsZSBpbiB0aGUgY3VycmVudCB0cmFjZSBzdGF0ZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHN0YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzYXZlVHJhY2VDb25maWdQb3NzaWJsZUluVGhpc1N0YXRlKHN0YXRlKTogYm9vbGVhbntcclxuICAgICAgICBpZihzdGF0ZSA9PSBUcmFjZVN0YXRlSWRzLkRpc2FibGVkIHx8IHN0YXRlID09IFRyYWNlU3RhdGVJZHMuRGF0YV9hdmFpbGFibGUgfHwgc3RhdGUgPT0gVHJhY2VTdGF0ZUlkcy5SZWNvcmRfZmFpbHVyZSl7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IFRyYWNlQ29udHJvbFdpZGdldCB9OyJdfQ==