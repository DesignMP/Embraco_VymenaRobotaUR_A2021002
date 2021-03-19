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
        /** initialize the widget
         *
         * @param {string} layoutContainerId
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.initialize = function (layoutContainerId) {
            _super.prototype.initialize.call(this, layoutContainerId);
        };
        TraceControlWidget.prototype.initializeComponent = function () {
            this.component.defaultSettingsDataId = defaultComponentSettings_1.DefaultComponentSettings.WidgetDefinitionId;
            this.component.disablePersisting();
        };
        /**
         * Returns the default component settings for this widget
         *
         * @returns {ComponentSettings}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2VDb250cm9sV2lkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL3RyYWNlQ29udHJvbFdpZGdldC90cmFjZUNvbnRyb2xXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQVVBOzs7O09BSUc7SUFDSCxJQUFLLFdBS0o7SUFMRCxXQUFLLFdBQVc7UUFDWixtREFBTyxDQUFBO1FBQ1AsK0RBQWEsQ0FBQTtRQUNiLCtEQUFhLENBQUE7UUFDYiwrREFBYSxDQUFBO0lBQ2pCLENBQUMsRUFMSSxXQUFXLEtBQVgsV0FBVyxRQUtmO0lBRUQ7Ozs7T0FJRztJQUNIO1FBQUE7UUFhQSxDQUFDO1FBWkcsdUJBQXVCO1FBQ1Asb0JBQVEsR0FBRyxVQUFVLENBQUM7UUFDdEIsc0JBQVUsR0FBRyxhQUFhLENBQUM7UUFDM0IscUJBQVMsR0FBRyxZQUFZLENBQUM7UUFDekIsa0NBQXNCLEdBQUcsMEJBQTBCLENBQUM7UUFDcEQsb0NBQXdCLEdBQUcsNEJBQTRCLENBQUM7UUFDeEQsb0NBQXdCLEdBQUcsNEJBQTRCLENBQUM7UUFFeEUseUJBQXlCO1FBQ1QsMkNBQStCLEdBQUcsTUFBTSxDQUFDO1FBQ3pDLDZDQUFpQyxHQUFHLFFBQVEsQ0FBQztRQUM3Qyw2Q0FBaUMsR0FBRyxRQUFRLENBQUM7UUFDakUsa0JBQUM7S0FBQSxBQWJELElBYUM7SUFFRDs7Ozs7T0FLRztJQUNIO1FBQWlDLHNDQUFVO1FBQTNDO1lBQUEscUVBNjFCQztZQW4xQlcsdUJBQWlCLEdBQUcsa0NBQWEsQ0FBQyxRQUFRLENBQUM7WUFFM0MseUJBQW1CLEdBQUcsS0FBSyxDQUFDO1lBQzVCLHVCQUFpQixHQUFHLEtBQUssQ0FBQztZQUkxQixtQkFBYSxHQUFHLElBQUksMkJBQVksRUFBRSxDQUFDO1lBRW5DLGdDQUEwQixHQUFHLFVBQUMsTUFBTSxFQUFDLElBQUksSUFBRyxPQUFBLEtB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QUFjLElBQUksS0FBSyxJQUFJLGtDQUFhLENBQUMsY0FBYyxFQUFDO2dCQUNqSCxPQUFPLElBQUksQ0FBQzthQUNmO1lBQ0QsT0FBTyxLQUFLLENBQUM7UUFDakIsQ0FBQztRQUNMLHlCQUFDO0lBQUQsQ0FBQyxBQTcxQkQsQ0FBaUMsdUJBQVUsR0E2MUIxQztJQUVRLGdEQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFdpZGdldEJhc2UgfSBmcm9tIFwiLi4vY29tbW9uL3dpZGdldEJhc2VcIjtcclxuaW1wb3J0IHsgSVRyYWNlQ29udHJvbFdpZGdldCB9IGZyb20gXCIuL2ludGVyZmFjZXMvdHJhY2VDb250cm9sV2lkZ2V0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElUcmFjZUNvbXBvbmVudENvbnRyb2wgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2RpYWdub3N0aWNzL3RyYWNlL2ludGVyZmFjZXMvdHJhY2VDb250cm9sUHJvdmlkZXJJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgRG9tSGVscGVyIH0gZnJvbSBcIi4uL2NvbW1vbi9kb21IZWxwZXJcIjtcclxuaW1wb3J0IHsgVGhlbWVQcm92aWRlciB9IGZyb20gXCIuLi9jb21tb24vdGhlbWVQcm92aWRlclwiO1xyXG5pbXBvcnQgeyBGaWxlUHJvdmlkZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2ZpbGVQcm92aWRlclwiO1xyXG5pbXBvcnQgeyBUcmFjZVN0YXRlSWRzIH0gZnJvbSBcIi4uLy4uL21vZGVscy9kaWFnbm9zdGljcy90cmFjZS90cmFjZUNvbmZpZy90cmFjZUNvbmZpZ0RlZmluZXNcIjtcclxuaW1wb3J0IHsgRGVmYXVsdENvbXBvbmVudFNldHRpbmdzIH0gZnJvbSBcIi4vZGVmYXVsdENvbXBvbmVudFNldHRpbmdzXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudFNldHRpbmdzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2NvbXBvbmVudFNldHRpbmdzXCI7XHJcblxyXG4vKipcclxuICogTGF5b3V0IHN0eWxlcyBmb3IgZHluYW1pYyBsYXlvdXRcclxuICpcclxuICogQGVudW0ge251bWJlcn1cclxuICovXHJcbmVudW0gTGF5b3V0U3R5bGV7XHJcbiAgICBEZWZhdWx0LFxyXG4gICAgTWluaW1pemVTdGVwMSxcclxuICAgIE1pbmltaXplU3RlcDIsXHJcbiAgICBNaW5pbWl6ZVN0ZXAzLFxyXG59XHJcblxyXG4vKipcclxuICogVGhlIHRleHRzIGZvciB0aGUgYnV0dG9uc1xyXG4gKlxyXG4gKiBAY2xhc3MgQnV0dG9uVGV4dHNcclxuICovXHJcbmNsYXNzIEJ1dHRvblRleHRze1xyXG4gICAgLy8gRGVmYXVsdCBidXR0b24gdGV4dHNcclxuICAgIHN0YXRpYyByZWFkb25seSBBY3RpdmF0ZSA9IFwiQWN0aXZhdGVcIjtcclxuICAgIHN0YXRpYyByZWFkb25seSBGb3JjZVN0YXJ0ID0gXCJGb3JjZSBzdGFydFwiO1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IEZvcmNlU3RvcCA9IFwiRm9yY2Ugc3RvcFwiO1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IFNhdmVUcmFjZUNvbmZpZ3VyYXRpb24gPSBcIlNhdmUgdHJhY2UgY29uZmlndXJhdGlvblwiO1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IEltcG9ydFRyYWNlQ29uZmlndXJhdGlvbiA9IFwiSW1wb3J0IHRyYWNlIGNvbmZpZ3VyYXRpb25cIjtcclxuICAgIHN0YXRpYyByZWFkb25seSBFeHBvcnRUcmFjZUNvbmZpZ3VyYXRpb24gPSBcIkV4cG9ydCB0cmFjZSBjb25maWd1cmF0aW9uXCI7XHJcblxyXG4gICAgLy8gTWluaW1pemVkIGJ1dHRvbiB0ZXh0c1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IFNhdmVUcmFjZUNvbmZpZ3VyYXRpb25NaW5pbWl6ZWQgPSBcIlNhdmVcIjtcclxuICAgIHN0YXRpYyByZWFkb25seSBJbXBvcnRUcmFjZUNvbmZpZ3VyYXRpb25NaW5pbWl6ZWQgPSBcIkltcG9ydFwiO1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IEV4cG9ydFRyYWNlQ29uZmlndXJhdGlvbk1pbmltaXplZCA9IFwiRXhwb3J0XCI7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBpbXBsZW1lbnRzIHRoZSBUcmFjZUNvbnRyb2xXaWRnZXRcclxuICpcclxuICogQGNsYXNzIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gKiBAZXh0ZW5kcyB7V2lkZ2V0QmFzZX1cclxuICovXHJcbmNsYXNzIFRyYWNlQ29udHJvbFdpZGdldCBleHRlbmRzIFdpZGdldEJhc2UgaW1wbGVtZW50cyBJVHJhY2VDb250cm9sV2lkZ2V0IHtcclxuICAgIHByaXZhdGUgX3N0YXRlRmllbGRJZDtcclxuICAgIHByaXZhdGUgX3N0YXRlSW1hZ2U7XHJcblxyXG4gICAgcHJpdmF0ZSBfYWN0aXZhdGVCdXR0b25JZDtcclxuICAgIHByaXZhdGUgX2ZvcmNlU3RhcnRCdXR0b25JZDtcclxuICAgIHByaXZhdGUgX2ZvcmNlU3RvcEJ1dHRvbklkO1xyXG4gICAgcHJpdmF0ZSBfc2F2ZVRyYWNlQ29uZmlndXJhdGlvbkJ1dHRvbklkO1xyXG4gICAgcHJpdmF0ZSBfaW1wb3J0VHJhY2VDb25maWd1cmF0aW9uQnV0dG9uSWQ7XHJcbiAgICBwcml2YXRlIF9leHBvcnRUcmFjZUNvbmZpZ3VyYXRpb25CdXR0b25JZDtcclxuICAgIHByaXZhdGUgX2FjdHVhbFRyYWNlU3RhdGUgPSBUcmFjZVN0YXRlSWRzLkRpc2FibGVkO1xyXG5cclxuICAgIHByaXZhdGUgX3NhdmVDb25maWdJc0FjdGl2ZSA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBfYWN0aXZhdGVJc0FjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgIHByaXZhdGUgX3RyYWNlQ29udHJvbEludGVyZmFjZTogSVRyYWNlQ29tcG9uZW50Q29udHJvbHx1bmRlZmluZWQ7XHJcblx0XHRcclxuICAgIHByaXZhdGUgX2ZpbGVQcm92aWRlciA9IG5ldyBGaWxlUHJvdmlkZXIoKTtcclxuXHRcclxuICAgIHByaXZhdGUgX3VwbG9hZERhdGFGaW5pc2hlZEhhbmRsZXIgPSAoc2VuZGVyLGFyZ3MpPT50aGlzLm9uVXBsb2FkRGF0YUZpbmlzaGVkKHNlbmRlcixhcmdzKTtcclxuICAgICAgICBcclxuICAgIC8qKlxyXG4gICAgICogRGVmYXVsdCBidXR0b24gd2lkdGggZm9yIGFjdGl2ZSBidXR0b25cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9kZWZhdWx0QnV0dG9uV2lkdGgxID0gXCI4NXB4XCI7XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogRGVmYXVsdCBidXR0b24gd2lkdGggZm9yIGZvcmNlIHN0YXJ0L3N0b3AgYnV0dG9uXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfZGVmYXVsdEJ1dHRvbldpZHRoMiA9IFwiMTAwcHhcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmF1bHQgYnV0dG9uIHdpZHRoIGZvciBzYXZlL2ltcG9ydC9leHBvcnQgdHJhY2UgY29uZmlnIGJ1dHRvbnNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9kZWZhdWx0QnV0dG9uV2lkdGgzID0gXCIxOTVweFwiO1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIE1pbmltaXplZCBTdGVwIDEgYnV0dG9uIHdpZHRoIGZvciBzYXZlL2ltcG9ydC9leHBvcnQgdHJhY2UgY29uZmlnIGJ1dHRvbnNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9kZWZhdWx0QnV0dG9uV2lkdGgzTWluaW1pemVkU3RlcDEgPSBcIjYwcHhcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE1pbmltaXplZCBTdGVwIDIgYnV0dG9uIHdpZHRoIGZvciBzYXZlL2ltcG9ydC9leHBvcnQgdHJhY2UgY29uZmlnIGJ1dHRvbnNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9kZWZhdWx0QnV0dG9uV2lkdGgzTWluaW1pemVkU3RlcDIgPSBcIjE2cHhcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmF1bHQgbGVmdCBwb3NpdGlvbiBvZiB0aGUgc2F2ZS9pbXBvcnQvZXhwb3J0IGJ1dHRvbnNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9sZWZ0UG9zaXRpb25TdGFydCA9IDczMDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmF1bHQgc3BhY2UgYmV0d2VlbiB0aGUgIHNhdmUvaW1wb3J0L2V4cG9ydCBidXR0b25zXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfZGVmYXVsdEJ1dHRvblNwYWNlID0gMzU7XHJcblxyXG4gICBcclxuICAgIC8qKiBpbml0aWFsaXplIHRoZSB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGF5b3V0Q29udGFpbmVySWRcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xXaWRnZXRcclxuICAgICAqL1xyXG4gICAgaW5pdGlhbGl6ZShsYXlvdXRDb250YWluZXJJZDogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIuaW5pdGlhbGl6ZShsYXlvdXRDb250YWluZXJJZCk7XHJcbiAgICB9XHJcbiAgIFxyXG4gICAgaW5pdGlhbGl6ZUNvbXBvbmVudCgpe1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmRlZmF1bHRTZXR0aW5nc0RhdGFJZCA9IERlZmF1bHRDb21wb25lbnRTZXR0aW5ncy5XaWRnZXREZWZpbml0aW9uSWQ7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZGlzYWJsZVBlcnNpc3RpbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRlZmF1bHQgY29tcG9uZW50IHNldHRpbmdzIGZvciB0aGlzIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtDb21wb25lbnRTZXR0aW5nc31cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xXaWRnZXRcclxuICAgICAqL1xyXG4gICAgZ2V0RGVmYXVsdENvbXBvbmVudFNldHRpbmdzKCk6IENvbXBvbmVudFNldHRpbmdze1xyXG4gICAgICAgIHJldHVybiBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MuZ2V0VHJhY2VDb250cm9sRGVmaW5pdGlvbigpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIERpc3Bvc2Ugc29tZSBvYmplY3RzIGZyb20gdGhpcyB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGRpc3Bvc2UoKXtcclxuICAgICAgICAvLyBEaXNwb3NlIHN0YXRpYyBidXR0b24gYW5kIGZpZWxkc1xyXG4gICAgICAgIHRoaXMuZGVzdHJveUJ1dHRvbih0aGlzLl9hY3RpdmF0ZUJ1dHRvbklkKTtcclxuICAgICAgICB0aGlzLmRlc3Ryb3lGaWVsZCh0aGlzLl9zdGF0ZUZpZWxkSWQpO1xyXG4gICAgICAgIHRoaXMuZGVzdHJveUJ1dHRvbih0aGlzLl9mb3JjZVN0YXJ0QnV0dG9uSWQpO1xyXG4gICAgICAgIHRoaXMuZGVzdHJveUJ1dHRvbih0aGlzLl9mb3JjZVN0b3BCdXR0b25JZCk7XHJcblxyXG4gICAgICAgIC8vIERpc3Bvc2UgZHluYW1pYyBidXR0b25zIGlmIGF2YWlsYWJsZVxyXG4gICAgICAgIHRoaXMuZGVzdHJveUJ1dHRvbih0aGlzLl9zYXZlVHJhY2VDb25maWd1cmF0aW9uQnV0dG9uSWQpO1xyXG4gICAgICAgIHRoaXMuZGVzdHJveUJ1dHRvbih0aGlzLl9pbXBvcnRUcmFjZUNvbmZpZ3VyYXRpb25CdXR0b25JZCk7XHJcbiAgICAgICAgdGhpcy5kZXN0cm95QnV0dG9uKHRoaXMuX2V4cG9ydFRyYWNlQ29uZmlndXJhdGlvbkJ1dHRvbklkKVxyXG5cclxuICAgICAgICBzdXBlci5kaXNwb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHRoZSB3aWRnZXQgY29udGVudCBhbmQgZXZlbnR1YWxseSBzdWJ3aWRnZXRzXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gICAgICovXHJcbiAgICBjcmVhdGVMYXlvdXQoKSB7XHJcbiAgICAgICAgdGhpcy5pbml0QnV0dG9uQW5kRmllbGRJZHMoKTtcclxuXHJcbiAgICAgICAgdGhpcy5jcmVhdGVEaXZCdXR0b25zQW5kRmllbGRzTGF5b3V0KCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5hZGRTdGF0aWNCdXR0b25zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0aWFsaXplcyB0aGUgaWRzIGZvciB0aGUgYnV0dG9ucyBhbmQgZmllbGRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpbml0QnV0dG9uQW5kRmllbGRJZHMoKXtcclxuICAgICAgICBsZXQgbGF5b3V0Q29udGFpbmVySWQgPSB0aGlzLnBhcmVudENvbnRlbnRJZDtcclxuICAgICAgICB0aGlzLl9hY3RpdmF0ZUJ1dHRvbklkID0gbGF5b3V0Q29udGFpbmVySWQgKyBcIl9hY3RpdmF0ZUJ1dHRvblwiO1xyXG4gICAgICAgIHRoaXMuX2ZvcmNlU3RhcnRCdXR0b25JZCA9IGxheW91dENvbnRhaW5lcklkICsgXCJfZm9yY2VTdGFydEJ1dHRvblwiO1xyXG4gICAgICAgIHRoaXMuX2ZvcmNlU3RvcEJ1dHRvbklkID0gbGF5b3V0Q29udGFpbmVySWQgKyBcIl9mb3JjZVN0b3BCdXR0b25cIjtcclxuICAgICAgICB0aGlzLl9zYXZlVHJhY2VDb25maWd1cmF0aW9uQnV0dG9uSWQgPSBsYXlvdXRDb250YWluZXJJZCArIFwiX3NhdmVUcmFjZUNvbmZpZ3VyYXRpb25CdXR0b25cIjtcclxuICAgICAgICB0aGlzLl9pbXBvcnRUcmFjZUNvbmZpZ3VyYXRpb25CdXR0b25JZCA9IGxheW91dENvbnRhaW5lcklkICsgXCJfaW1wb3J0VHJhY2VDb25maWd1cmF0aW9uQnV0dG9uXCI7XHJcbiAgICAgICAgdGhpcy5fZXhwb3J0VHJhY2VDb25maWd1cmF0aW9uQnV0dG9uSWQgPSBsYXlvdXRDb250YWluZXJJZCArIFwiX2V4cG9ydFRyYWNlQ29uZmlndXJhdGlvbkJ1dHRvblwiO1xyXG4gICAgICAgIHRoaXMuX3N0YXRlRmllbGRJZCA9IGxheW91dENvbnRhaW5lcklkICsgXCJ0cmFjZWNvbnRyb2xfc3RhdGVcIjtcclxuICAgICAgICB0aGlzLl9zdGF0ZUltYWdlID0gbGF5b3V0Q29udGFpbmVySWQgKyBcInRyYWNlY29udHJvbF9zdGF0ZV9pbWFnZVwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgbGF5b3V0IGZvciB0aGUgYnV0dG9ucyBhbmQgZmllbGRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdGVEaXZCdXR0b25zQW5kRmllbGRzTGF5b3V0KCl7XHJcbiAgICAgICAgbGV0IGVsZW1lbnQgPSAkKHRoaXMuY3NzUGFyZW50Q29udGVudElkKTtcclxuICAgICAgICBlbGVtZW50WzBdLnN0eWxlLnBhZGRpbmdUb3AgPSBcIjRweFwiO1xyXG4gICAgICAgIGVsZW1lbnRbMF0uc3R5bGUuYmFja2dyb3VuZCA9IFwidmFyKC0tbWFpbi1ncmV5LWRhcmsyKVwiO1xyXG4gICAgICAgIGVsZW1lbnRbMF0uc3R5bGUub3ZlcmZsb3cgPSBcImhpZGRlblwiO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGVsZW1lbnQuYXBwZW5kKFwiPGRpdiBzdHlsZT0nbGVmdDogMjVweDsgcG9zaXRpb246IGFic29sdXRlOycgaWQ9J1wiKyB0aGlzLl9hY3RpdmF0ZUJ1dHRvbklkICtcIic+PC9kaXY+XCIpO1xyXG4gICAgICAgIGVsZW1lbnQuYXBwZW5kKFwiPGRpdiBzdHlsZT0ndG9wOiAxMHB4OyBsZWZ0OiAxNTBweDsgcG9zaXRpb246IGFic29sdXRlOycgY2xhc3M9J3RyYWNlQ29udHJvbFN0YXRlSW1hZ2UnIGlkPSdcIisgdGhpcy5fc3RhdGVJbWFnZSArXCInPjwvZGl2PlwiKTtcclxuICAgICAgICBlbGVtZW50LmFwcGVuZChcIjxkaXYgc3R5bGU9J3RvcDogMTBweDsgbGVmdDogMTgwcHg7IHBvc2l0aW9uOiBhYnNvbHV0ZTsnIGlkPSdcIisgdGhpcy5fc3RhdGVGaWVsZElkICtcIic+PC9kaXY+XCIpO1xyXG4gICAgICAgIGVsZW1lbnQuYXBwZW5kKFwiPGRpdiBzdHlsZT0nbGVmdDogMzQwcHg7IHBvc2l0aW9uOiBhYnNvbHV0ZTsnIGlkPSdcIisgdGhpcy5fZm9yY2VTdGFydEJ1dHRvbklkICtcIic+PC9kaXY+XCIpO1xyXG4gICAgICAgIGVsZW1lbnQuYXBwZW5kKFwiPGRpdiBzdHlsZT0nbGVmdDogNDc1cHg7IHBvc2l0aW9uOiBhYnNvbHV0ZTsnIGlkPSdcIisgdGhpcy5fZm9yY2VTdG9wQnV0dG9uSWQgK1wiJz48L2Rpdj5cIik7XHJcbiAgICAgICAgZWxlbWVudC5hcHBlbmQoXCI8ZGl2IHN0eWxlPSdsZWZ0OiBcIiArIHRoaXMuZ2V0TGVmdFBvc2l0aW9uKDApICsgXCJweDsgcG9zaXRpb246IGFic29sdXRlOycgaWQ9J1wiKyB0aGlzLl9zYXZlVHJhY2VDb25maWd1cmF0aW9uQnV0dG9uSWQgK1wiJz48L2Rpdj5cIik7XHJcbiAgICAgICAgZWxlbWVudC5hcHBlbmQoXCI8ZGl2IHN0eWxlPSdsZWZ0OiBcIiArIHRoaXMuZ2V0TGVmdFBvc2l0aW9uKDEpICsgXCJweDsgcG9zaXRpb246IGFic29sdXRlOycgaWQ9J1wiKyB0aGlzLl9pbXBvcnRUcmFjZUNvbmZpZ3VyYXRpb25CdXR0b25JZCArXCInPjwvZGl2PlwiKTtcclxuICAgICAgICBlbGVtZW50LmFwcGVuZChcIjxkaXYgc3R5bGU9J2xlZnQ6IFwiICsgdGhpcy5nZXRMZWZ0UG9zaXRpb24oMikgKyBcInB4OyBwb3NpdGlvbjogYWJzb2x1dGU7JyBpZD0nXCIrIHRoaXMuX2V4cG9ydFRyYWNlQ29uZmlndXJhdGlvbkJ1dHRvbklkICtcIic+PC9kaXY+XCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgbGVmdCBwb3NpdGlvbiBvZiBhIGJ1dHRvbiBmb3IgdGhlIGdpdmVuIExheW91dFN0eWxlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleFxyXG4gICAgICogQHBhcmFtIHtMYXlvdXRTdHlsZX0gW2xheW91dFN0eWxlPUxheW91dFN0eWxlLkRlZmF1bHRdXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldExlZnRQb3NpdGlvbihpbmRleDogbnVtYmVyLCBsYXlvdXRTdHlsZTogTGF5b3V0U3R5bGUgPSBMYXlvdXRTdHlsZS5EZWZhdWx0KTogbnVtYmVye1xyXG4gICAgICAgIGlmKGluZGV4ID09IDApe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbGVmdFBvc2l0aW9uU3RhcnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGxldCBkZWZhdWx0QnV0dG9uV2lkdGggPSB0aGlzLl9kZWZhdWx0QnV0dG9uV2lkdGgzO1xyXG4gICAgICAgICAgICBpZihsYXlvdXRTdHlsZSA9PSBMYXlvdXRTdHlsZS5NaW5pbWl6ZVN0ZXAxKXtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHRCdXR0b25XaWR0aCA9IHRoaXMuX2RlZmF1bHRCdXR0b25XaWR0aDNNaW5pbWl6ZWRTdGVwMTtcclxuICAgICAgICAgICAgfWVsc2UgaWYobGF5b3V0U3R5bGUgPT0gTGF5b3V0U3R5bGUuTWluaW1pemVTdGVwMil7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0QnV0dG9uV2lkdGggPSB0aGlzLl9kZWZhdWx0QnV0dG9uV2lkdGgzTWluaW1pemVkU3RlcDI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGJ1dHRvbldpZHRoID0gcGFyc2VJbnQoZGVmYXVsdEJ1dHRvbldpZHRoLCAxMCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9sZWZ0UG9zaXRpb25TdGFydCArIChpbmRleCAqIChidXR0b25XaWR0aCArIHRoaXMuX2RlZmF1bHRCdXR0b25TcGFjZSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIGJ1dHRvbnMgYW5kIGZpZWxkc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkU3RhdGljQnV0dG9ucygpe1xyXG4gICAgICAgIHRoaXMuY3JlYXRlQnV0dG9uKHRoaXMuX2FjdGl2YXRlQnV0dG9uSWQsIEJ1dHRvblRleHRzLkFjdGl2YXRlLCAgdGhpcy5nZXRJbWFnZVBhdGgoXCJwbGF5LnN2Z1wiKSwgdGhpcy5fZGVmYXVsdEJ1dHRvbldpZHRoMSk7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVGaWVsZCh0aGlzLl9zdGF0ZUZpZWxkSWQpO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlQnV0dG9uKHRoaXMuX2ZvcmNlU3RhcnRCdXR0b25JZCwgQnV0dG9uVGV4dHMuRm9yY2VTdGFydCwgIHRoaXMuZ2V0SW1hZ2VQYXRoKFwicmVjb3JkLnN2Z1wiKSwgdGhpcy5fZGVmYXVsdEJ1dHRvbldpZHRoMik7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVCdXR0b24odGhpcy5fZm9yY2VTdG9wQnV0dG9uSWQsIEJ1dHRvblRleHRzLkZvcmNlU3RvcCwgIHRoaXMuZ2V0SW1hZ2VQYXRoKFwic3RvcC5zdmdcIiksIHRoaXMuX2RlZmF1bHRCdXR0b25XaWR0aDIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9hZHMgdGhlIHN0eWxlcyBmb3IgdGhlIHRyYWNlIGNvbnRyb2wgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gICAgICovXHJcbiAgICBsb2FkU3R5bGVzKCl7XHJcbiAgICAgICAgc3VwZXIuYWRkU3R5bGUoXCJ3aWRnZXRzL3RyYWNlQ29udHJvbFdpZGdldC9zdHlsZS9jc3MvdHJhY2VDb250cm9sU3R5bGUuY3NzXCIpO1xyXG4gICAgICAgIHN1cGVyLmFkZFN0eWxlKFwid2lkZ2V0cy90cmFjZUNvbnRyb2xXaWRnZXQvc3R5bGUvY3NzL3RyYWNlQ29udHJvbEJ1dHRvblN0eWxlLmNzc1wiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFjdGl2YXRlcy9EZWFjdGl2YXRlcyBhIGJ1dHRvblxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gZGVhY3RpdmF0ZVxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBkZWFjdGl2YXRlQnV0dG9uKGlkOiBzdHJpbmcsIGRlYWN0aXZhdGU6IGJvb2xlYW4pe1xyXG4gICAgICAgIHZhciBlakJ1dHRvbiA9ICQoXCIjXCIrIGlkKS5kYXRhKFwiZWpCdXR0b25cIik7XHJcbiAgICAgICAgaWYoZWpCdXR0b24gPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgdGhpcy5zZXRCdXR0b25Dc3NDbGFzcyhlakJ1dHRvbiwgZGVhY3RpdmF0ZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGJ1dHRvbkVsZW1lbnQgPSAkKFwiI1wiICsgaWQpWzBdO1xyXG5cclxuICAgICAgICBsZXQgaW1hZ2VQYXRoID0gdGhpcy5nZXRJbWFnZVBhdGhGb3JJZChpZCwgZGVhY3RpdmF0ZSk7XHJcbiAgICAgICAgYnV0dG9uRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcInVybCgnXCIgKyBpbWFnZVBhdGggK1wiJylcIjtcclxuXHJcbiAgICAgICAgRG9tSGVscGVyLmRpc2FibGVFbGVtZW50KGJ1dHRvbkVsZW1lbnQsIGRlYWN0aXZhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgbGF5b3V0IG9mIHRoZSBidXR0b24oZS5nLiB0ZXh0LCBzaXplLCBsZWZ0IHBvc3Rpb24pXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGJ1dHRvblRleHRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuZXdTaXplXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmV3TGVmdFBvc2l0aW9uXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldEJ1dHRvbkxheW91dChpZDogc3RyaW5nLCBidXR0b25UZXh0OiBzdHJpbmcsIG5ld1NpemU6IHN0cmluZywgbmV3TGVmdFBvc2l0aW9uOiBzdHJpbmcpe1xyXG4gICAgICAgIHZhciBlakJ1dHRvbiA9ICQoXCIjXCIrIGlkKS5kYXRhKFwiZWpCdXR0b25cIik7XHJcbiAgICAgICAgaWYoZWpCdXR0b24gPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlakJ1dHRvbi5vcHRpb24oXCJ0ZXh0XCIsIGJ1dHRvblRleHQsIHRydWUpO1xyXG4gICAgICAgIGlmKGJ1dHRvblRleHQgPT0gXCJcIil7XHJcbiAgICAgICAgICAgIGVqQnV0dG9uLm9wdGlvbihcImNvbnRlbnRUeXBlXCIsIGVqLkNvbnRlbnRUeXBlLkltYWdlT25seSwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGVqQnV0dG9uLm9wdGlvbihcImNvbnRlbnRUeXBlXCIsIGVqLkNvbnRlbnRUeXBlLlRleHRBbmRJbWFnZSwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVqQnV0dG9uLm9wdGlvbihcIndpZHRoXCIsIG5ld1NpemUsIHRydWUpO1xyXG5cclxuICAgICAgICBsZXQgYnV0dG9uRWxlbWVudCA9ICQoXCIjXCIgKyBpZClbMF07XHJcbiAgICAgICAgaWYoYnV0dG9uRWxlbWVudCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBidXR0b25FbGVtZW50LnN0eWxlLmxlZnQgPSBuZXdMZWZ0UG9zaXRpb25cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBpbWFnZXBhdGggZm9yIHRoZSBidXR0b24gaWRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBidXR0b25JZFxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBkZWFjdGl2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldEltYWdlUGF0aEZvcklkKGJ1dHRvbklkOiBzdHJpbmcsIGRlYWN0aXZhdGU6IGJvb2xlYW4pOiBzdHJpbmd7XHJcbiAgICAgICAgbGV0IGltYWdlUGF0aDtcclxuICAgICAgICBpZihidXR0b25JZCA9PSB0aGlzLl9mb3JjZVN0YXJ0QnV0dG9uSWQpe1xyXG4gICAgICAgICAgICBpbWFnZVBhdGggPSB0aGlzLmdldEltYWdlUGF0aChcInJlY29yZC5zdmdcIiwgZGVhY3RpdmF0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoYnV0dG9uSWQgPT0gdGhpcy5fZm9yY2VTdG9wQnV0dG9uSWQpe1xyXG4gICAgICAgICAgICBpbWFnZVBhdGggPSB0aGlzLmdldEltYWdlUGF0aChcInN0b3Auc3ZnXCIsIGRlYWN0aXZhdGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKGJ1dHRvbklkID09IHRoaXMuX3NhdmVUcmFjZUNvbmZpZ3VyYXRpb25CdXR0b25JZCl7XHJcbiAgICAgICAgICAgIGltYWdlUGF0aCA9IHRoaXMuZ2V0SW1hZ2VQYXRoKFwic2F2ZS5zdmdcIiwgZGVhY3RpdmF0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoYnV0dG9uSWQgPT0gdGhpcy5fYWN0aXZhdGVCdXR0b25JZCl7XHJcbiAgICAgICAgICAgIGltYWdlUGF0aCA9IHRoaXMuZ2V0SW1hZ2VQYXRoKFwicGxheS5zdmdcIiwgZGVhY3RpdmF0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoYnV0dG9uSWQgPT0gdGhpcy5faW1wb3J0VHJhY2VDb25maWd1cmF0aW9uQnV0dG9uSWQpe1xyXG4gICAgICAgICAgICBpbWFnZVBhdGggPSB0aGlzLmdldEltYWdlUGF0aChcImltcG9ydC5zdmdcIiwgZGVhY3RpdmF0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoYnV0dG9uSWQgPT0gdGhpcy5fZXhwb3J0VHJhY2VDb25maWd1cmF0aW9uQnV0dG9uSWQpe1xyXG4gICAgICAgICAgICBpbWFnZVBhdGggPSB0aGlzLmdldEltYWdlUGF0aChcImV4cG9ydC5zdmdcIiwgZGVhY3RpdmF0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpbWFnZVBhdGg7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBCdXR0b24gY3NzIHN0eWxlcyBmb3IgYWN0aXZhdGVkIG9yIGRlYWN0aXZhdGVkIHN0YXRlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gZWpCdXR0b25cclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gZGVhY3RpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldEJ1dHRvbkNzc0NsYXNzKGVqQnV0dG9uLCBkZWFjdGl2YXRlOiBib29sZWFuKXtcclxuICAgICAgICBpZihkZWFjdGl2YXRlID09IHRydWUpe1xyXG4gICAgICAgICAgICBlakJ1dHRvbi5vcHRpb24oXCJjc3NDbGFzc1wiLCBcInRyYWNlQ29udHJvbEJ1dHRvbkRlYWN0aXZhdGVkXCIsIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBlakJ1dHRvbi5vcHRpb24oXCJjc3NDbGFzc1wiLCBcInRyYWNlQ29udHJvbEJ1dHRvblwiLCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgYnV0dG9uIHdpdGggdGhlIGdpdmVuIHRleHQgYW5kIGltYWdlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGltYWdlUGF0aFxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0ZUJ1dHRvbihpZDogc3RyaW5nLCB0ZXh0OiBzdHJpbmcsIGltYWdlUGF0aDogc3RyaW5nLCB3aWR0aCl7XHJcbiAgICAgICAgKDxhbnk+JChcIiNcIiArIGlkKSkuZWpCdXR0b24oe1xyXG4gICAgICAgICAgICB0ZXh0OiB0ZXh0LFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogZWouQ29udGVudFR5cGUuVGV4dEFuZEltYWdlLFxyXG4gICAgICAgICAgICBjc3NDbGFzczogXCJ0cmFjZUNvbnRyb2xCdXR0b25cIixcclxuICAgICAgICAgICAgcHJlZml4SWNvbjogXCJlLWljb25cIiwgLy9TcGVjaWZpZXMgdGhlIHByaW1hcnkgaWNvbiBmb3IgQnV0dG9uXHJcbiAgICAgICAgICAgIGNsaWNrOiAoY2xpY2tBcmdzKSA9PiB0aGlzLmNsaWNrKGlkKSxcclxuICAgICAgICAgICAgd2lkdGg6IHdpZHRoLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgYnV0dG9uRWxlbWVudCA9ICQoXCIjXCIgKyBpZClbMF07XHJcbiAgICAgICAgYnV0dG9uRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kUG9zaXRpb25YID0gXCI0cHhcIjtcclxuICAgICAgICBidXR0b25FbGVtZW50LnN0eWxlLmJhY2tncm91bmRQb3NpdGlvblkgPSBcIjRweFwiO1xyXG4gICAgICAgIGJ1dHRvbkVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJ1cmwoJ1wiICsgaW1hZ2VQYXRoICtcIicpXCI7XHJcbiAgICAgICAgYnV0dG9uRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kUmVwZWF0ID0gXCJuby1yZXBlYXRcIjtcclxuICAgICAgICBidXR0b25FbGVtZW50LnN0eWxlLmJhY2tncm91bmRTaXplID0gXCIxNnB4IDE2cHhcIjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlc3Ryb3lzIHRoZSBidXR0b24gb2JqZWN0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZGVzdHJveUJ1dHRvbihpZDogc3RyaW5nKXtcclxuICAgICAgICBsZXQgYnV0dG9uID0gJChcIiNcIiArIGlkKS5kYXRhKFwiZWpCdXR0b25cIik7XHJcbiAgICAgICAgaWYoYnV0dG9uICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGJ1dHRvbi5kZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIHRyYWNlIHN0YXRlIGZpZWxkIChjdXJyZW50bHkgYSBzcGVjaWFsIGJ1dHRvbiBpcyB1c2VkKVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0ZUZpZWxkKGlkOiBzdHJpbmcpe1xyXG4gICAgICAgICg8YW55PiQoXCIjXCIgKyBpZCkpLmVqQnV0dG9uKHtcclxuICAgICAgICAgICAgdGV4dDogXCIwXCIsXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBlai5Db250ZW50VHlwZS5UZXh0T25seSxcclxuICAgICAgICAgICAgY3NzQ2xhc3M6IFwidHJhY2VTdGF0ZUJ1dHRvblwiLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgZmllbGRFbGVtZW50ID0gJChcIiNcIiArIGlkKVswXTtcclxuICAgICAgICBpZihmaWVsZEVsZW1lbnQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgZmllbGRFbGVtZW50LnN0eWxlLmNvbG9yID0gXCIjRkZGRkZGXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVzdHJveXMgdGhlIGZpZWxkIG9iamVjdFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGRlc3Ryb3lGaWVsZChpZDogc3RyaW5nKXtcclxuICAgICAgICBsZXQgZmllbGQgPSAkKFwiI1wiICsgaWQpLmRhdGEoXCJlakJ1dHRvblwiKTtcclxuICAgICAgICBpZihmaWVsZCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBmaWVsZC5kZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVzaXplcyB0aGUgdHJhY2UgY29udHJvbCB3aWRnZXRcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHdpZHRoXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaGVpZ2h0XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHJlc2l6ZSh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcil7XHJcblxyXG4gICAgICAgIHRoaXMuX2FjdHVhbEhlaWdodCA9IGhlaWdodDtcclxuICAgICAgICB0aGlzLl9hY3R1YWxXaWR0aCA9IHdpZHRoO1xyXG5cclxuICAgICAgICAkKHRoaXMuY3NzUGFyZW50Q29udGVudElkKVswXS5zdHlsZS53aWR0aCA9IHdpZHRoLnRvU3RyaW5nKCkgKyBcInB4XCI7XHJcbiAgICAgICAgJCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZClbMF0uc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0LnRvU3RyaW5nKCkgKyBcInB4XCI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy51cGRhdGVEeW5hbWljTGF5b3V0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBkeW5hbWljIGxheW91dCAoZS5nLiBzbWFsbGVyIGJ1dHRvbnMgaWYgc21hbGwgd2lkZ2V0IHNpemUpXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVEeW5hbWljTGF5b3V0KCl7XHJcbiAgICAgICAgbGV0IG5lZWRlZFNpemVGb3JEZWZhdWx0TGF5b3V0ID0gMTQwMDtcclxuICAgICAgICBsZXQgbmVlZGVkU2l6ZUZvck1pbmltemVkTGF5b3V0U3RlcDEgPSAxMDAwO1xyXG4gICAgICAgIGlmKHRoaXMuX2FjdHVhbFdpZHRoID4gbmVlZGVkU2l6ZUZvckRlZmF1bHRMYXlvdXQpe1xyXG4gICAgICAgICAgICB0aGlzLnNldExheW91dChMYXlvdXRTdHlsZS5EZWZhdWx0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih0aGlzLl9hY3R1YWxXaWR0aCA+IG5lZWRlZFNpemVGb3JNaW5pbXplZExheW91dFN0ZXAxKXtcclxuICAgICAgICAgICAgdGhpcy5zZXRMYXlvdXQoTGF5b3V0U3R5bGUuTWluaW1pemVTdGVwMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0TGF5b3V0KExheW91dFN0eWxlLk1pbmltaXplU3RlcDIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGR5bmFtaWMgbGF5b3V0IHRvIGEgZGVmaW5lZCBsYXlvdXQgc3R5bGUgKGUuZy4gZGVmYXVsdCBvciBtaW5pbWl6ZWQpXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7TGF5b3V0U3R5bGV9IGxheW91dFN0eWxlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0TGF5b3V0KGxheW91dFN0eWxlOiBMYXlvdXRTdHlsZSl7XHJcbiAgICAgICAgc3dpdGNoKGxheW91dFN0eWxlKXtcclxuICAgICAgICAgICAgY2FzZSBMYXlvdXRTdHlsZS5NaW5pbWl6ZVN0ZXAyOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEJ1dHRvbkxheW91dCh0aGlzLl9zYXZlVHJhY2VDb25maWd1cmF0aW9uQnV0dG9uSWQsIFwiXCIsIHRoaXMuX2RlZmF1bHRCdXR0b25XaWR0aDNNaW5pbWl6ZWRTdGVwMiwgdGhpcy5nZXRMZWZ0UG9zaXRpb24oMCwgTGF5b3V0U3R5bGUuTWluaW1pemVTdGVwMikgKyBcInB4XCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRCdXR0b25MYXlvdXQodGhpcy5faW1wb3J0VHJhY2VDb25maWd1cmF0aW9uQnV0dG9uSWQsIFwiXCIsIHRoaXMuX2RlZmF1bHRCdXR0b25XaWR0aDNNaW5pbWl6ZWRTdGVwMiwgdGhpcy5nZXRMZWZ0UG9zaXRpb24oMSwgTGF5b3V0U3R5bGUuTWluaW1pemVTdGVwMikgKyBcInB4XCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRCdXR0b25MYXlvdXQodGhpcy5fZXhwb3J0VHJhY2VDb25maWd1cmF0aW9uQnV0dG9uSWQsIFwiXCIsIHRoaXMuX2RlZmF1bHRCdXR0b25XaWR0aDNNaW5pbWl6ZWRTdGVwMiwgdGhpcy5nZXRMZWZ0UG9zaXRpb24oMiwgTGF5b3V0U3R5bGUuTWluaW1pemVTdGVwMikgKyBcInB4XCIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBMYXlvdXRTdHlsZS5NaW5pbWl6ZVN0ZXAxOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEJ1dHRvbkxheW91dCh0aGlzLl9zYXZlVHJhY2VDb25maWd1cmF0aW9uQnV0dG9uSWQsIEJ1dHRvblRleHRzLlNhdmVUcmFjZUNvbmZpZ3VyYXRpb25NaW5pbWl6ZWQsIHRoaXMuX2RlZmF1bHRCdXR0b25XaWR0aDNNaW5pbWl6ZWRTdGVwMSwgdGhpcy5nZXRMZWZ0UG9zaXRpb24oMCwgTGF5b3V0U3R5bGUuTWluaW1pemVTdGVwMSkgKyBcInB4XCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRCdXR0b25MYXlvdXQodGhpcy5faW1wb3J0VHJhY2VDb25maWd1cmF0aW9uQnV0dG9uSWQsIEJ1dHRvblRleHRzLkltcG9ydFRyYWNlQ29uZmlndXJhdGlvbk1pbmltaXplZCwgdGhpcy5fZGVmYXVsdEJ1dHRvbldpZHRoM01pbmltaXplZFN0ZXAxLCB0aGlzLmdldExlZnRQb3NpdGlvbigxLCBMYXlvdXRTdHlsZS5NaW5pbWl6ZVN0ZXAxKSArIFwicHhcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEJ1dHRvbkxheW91dCh0aGlzLl9leHBvcnRUcmFjZUNvbmZpZ3VyYXRpb25CdXR0b25JZCwgQnV0dG9uVGV4dHMuRXhwb3J0VHJhY2VDb25maWd1cmF0aW9uTWluaW1pemVkLCB0aGlzLl9kZWZhdWx0QnV0dG9uV2lkdGgzTWluaW1pemVkU3RlcDEsIHRoaXMuZ2V0TGVmdFBvc2l0aW9uKDIsIExheW91dFN0eWxlLk1pbmltaXplU3RlcDEpICsgXCJweFwiKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgTGF5b3V0U3R5bGUuRGVmYXVsdDoge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRCdXR0b25MYXlvdXQodGhpcy5fc2F2ZVRyYWNlQ29uZmlndXJhdGlvbkJ1dHRvbklkLCBCdXR0b25UZXh0cy5TYXZlVHJhY2VDb25maWd1cmF0aW9uLCB0aGlzLl9kZWZhdWx0QnV0dG9uV2lkdGgzLCB0aGlzLmdldExlZnRQb3NpdGlvbigwKSArIFwicHhcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEJ1dHRvbkxheW91dCh0aGlzLl9pbXBvcnRUcmFjZUNvbmZpZ3VyYXRpb25CdXR0b25JZCwgQnV0dG9uVGV4dHMuSW1wb3J0VHJhY2VDb25maWd1cmF0aW9uLCB0aGlzLl9kZWZhdWx0QnV0dG9uV2lkdGgzLCB0aGlzLmdldExlZnRQb3NpdGlvbigxKSArXCJweFwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0QnV0dG9uTGF5b3V0KHRoaXMuX2V4cG9ydFRyYWNlQ29uZmlndXJhdGlvbkJ1dHRvbklkLCBCdXR0b25UZXh0cy5FeHBvcnRUcmFjZUNvbmZpZ3VyYXRpb24sIHRoaXMuX2RlZmF1bHRCdXR0b25XaWR0aDMsIHRoaXMuZ2V0TGVmdFBvc2l0aW9uKDIpICsgXCJweFwiKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgYW5kIGRlZmluZXMgdGhlIGludGVyZmFjZSB0byB0aGUgdHJhY2UgY29udHJvbFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCB0cmFjZUNvbnRyb2xJbnRlcmZhY2UodHJhY2VDb21wb25lbnRDb250cm9sOiBJVHJhY2VDb21wb25lbnRDb250cm9sKSB7XHJcbiAgICAgICAgdGhpcy5fdHJhY2VDb250cm9sSW50ZXJmYWNlID0gdHJhY2VDb21wb25lbnRDb250cm9sO1xyXG4gICAgICAgIGlmKHRoaXMuX3RyYWNlQ29udHJvbEludGVyZmFjZSl7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkRHluYW1pY0J1dHRvbnNGb3JBdmFpbGFibGVDb21tYW5kcyh0aGlzLl90cmFjZUNvbnRyb2xJbnRlcmZhY2UpO1xyXG4gICAgICAgICAgICB0aGlzLmFkZFRyYWNlU3RhdGUodGhpcy5fdHJhY2VDb250cm9sSW50ZXJmYWNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGQgdHJhY2Ugc3RhdGUgaW5mbyB0byBsYXlvdXRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSB0cmFjZUNvbnRyb2xJbnRlcmZhY2VcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGRUcmFjZVN0YXRlKHRyYWNlQ29udHJvbEludGVyZmFjZSl7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVGaWVsZCh0aGlzLl9zdGF0ZUZpZWxkSWQpO1xyXG5cclxuICAgICAgICB0aGlzLnJlZnJlc2hUcmFjZUNvbnRyb2xQYXJhbWV0ZXJWYWx1ZSh0aGlzLl9hY3R1YWxUcmFjZVN0YXRlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgdGhlIGR5bmFtaWMgYnV0dG9ucyAoc2F2ZS9pbXBvcnQvZXhwb3J0IHRyYWNlIGNvbmZpZ3VhdGlvbikgaWYgY29tbWFuZCBpcyBhdmFpbGFibGUgaW4gY29tbWFuZCBpbnRlcmZhY2VcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBjb21tYW5kc1xyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkZER5bmFtaWNCdXR0b25zRm9yQXZhaWxhYmxlQ29tbWFuZHMoY29tbWFuZHMpe1xyXG4gICAgICAgIGlmKGNvbW1hbmRzLmNvbW1hbmRTYXZlQ29uZmlndXJhdGlvbil7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQnV0dG9uKHRoaXMuX3NhdmVUcmFjZUNvbmZpZ3VyYXRpb25CdXR0b25JZCwgQnV0dG9uVGV4dHMuU2F2ZVRyYWNlQ29uZmlndXJhdGlvbiwgdGhpcy5nZXRJbWFnZVBhdGgoXCJzYXZlLnN2Z1wiKSwgdGhpcy5fZGVmYXVsdEJ1dHRvbldpZHRoMyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGNvbW1hbmRzLmNvbW1hbmRJbXBvcnRUcmFjZUNvbmZpZ3VyYXRpb24pe1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUJ1dHRvbih0aGlzLl9pbXBvcnRUcmFjZUNvbmZpZ3VyYXRpb25CdXR0b25JZCwgQnV0dG9uVGV4dHMuSW1wb3J0VHJhY2VDb25maWd1cmF0aW9uLCAgdGhpcy5nZXRJbWFnZVBhdGgoXCJpbXBvcnQuc3ZnXCIpLCB0aGlzLl9kZWZhdWx0QnV0dG9uV2lkdGgzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoY29tbWFuZHMuY29tbWFuZEV4cG9ydFRyYWNlQ29uZmlndXJhdGlvbil7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQnV0dG9uKHRoaXMuX2V4cG9ydFRyYWNlQ29uZmlndXJhdGlvbkJ1dHRvbklkLCBCdXR0b25UZXh0cy5FeHBvcnRUcmFjZUNvbmZpZ3VyYXRpb24sICB0aGlzLmdldEltYWdlUGF0aChcImV4cG9ydC5zdmdcIiksIHRoaXMuX2RlZmF1bHRCdXR0b25XaWR0aDMpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIFVwZGF0ZSBsYXlvdXQgYWZ0ZXIgYWRkaW5nIG5ldyBidXR0b25zXHJcbiAgICAgICAgdGhpcy51cGRhdGVEeW5hbWljTGF5b3V0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXaWxsIGJlIGNhbGxlZCB3aGVuIGEgYnV0dG9uIHdhcyBjbGlja2VkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gYnV0dG9uSWRcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjbGljayhidXR0b25JZCl7XHJcblxyXG4gICAgICAgIHN3aXRjaChidXR0b25JZCl7XHJcbiAgICAgICAgICAgIGNhc2UgdGhpcy5fYWN0aXZhdGVCdXR0b25JZDpcclxuICAgICAgICAgICAgICAgIHRoaXMuZXhlY3V0ZUFjdGl2YXRlKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSB0aGlzLl9mb3JjZVN0YXJ0QnV0dG9uSWQ6ICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMuZXhlY3V0ZUZvcmNlU3RhcnQoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIHRoaXMuX2ZvcmNlU3RvcEJ1dHRvbklkOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5leGVjdXRlRm9yY2VTdG9wKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSB0aGlzLl9zYXZlVHJhY2VDb25maWd1cmF0aW9uQnV0dG9uSWQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmV4ZWN1dGVTYXZlQ29uZmlndXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgdGhpcy5faW1wb3J0VHJhY2VDb25maWd1cmF0aW9uQnV0dG9uSWQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmltcG9ydFRyYWNlQ29uZmlndXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgdGhpcy5fZXhwb3J0VHJhY2VDb25maWd1cmF0aW9uQnV0dG9uSWQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmV4cG9ydFRyYWNlQ29uZmlndXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWN0aXZhdGVzIHRoZSB0cmFjZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZXhlY3V0ZUFjdGl2YXRlKCl7XHJcbiAgICAgICAgLy8gaW52b2tlIGFjdGl2YXRlIHRyYWNlIGJ5IHVzaW5nIGEgY29tcG9uZW50IGNvbW1hbmRcclxuICAgICAgICBpZih0aGlzLl9zYXZlQ29uZmlnSXNBY3RpdmUgPT0gZmFsc2UpeyAgXHJcblxyXG4gICAgICAgICAgICB0aGlzLl9hY3RpdmF0ZUlzQWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5zZXRCdXR0b25TdGF0ZXModGhpcy5fdHJhY2VDb250cm9sSW50ZXJmYWNlIS50cmFjZVN0YXRlLnZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZhdGVUcmFjZSgpOyAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYWN0aXZhdGVUcmFjZSgpIHtcclxuICAgICAgICAvLyBCSU5ESU5HU09VUkNFOiBkaXNwYXRjaGVzIHRoZSBtdGhvZCB0byBib3VuZCB0YXJnZXRzXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQcm9jZXNzZXMgdHJhY2UgYWN0aXZhdGlvbiByZXNwb25zZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25UcmFjZUFjdGl2YXRlZCgpIHtcclxuICAgICAgICB0aGlzLl9hY3RpdmF0ZUlzQWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zZXRCdXR0b25TdGF0ZXModGhpcy5fYWN0dWFsVHJhY2VTdGF0ZSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogaGFuZGxlcyB0cmFjZSBzdGF0ZSBjaGFuZ2VzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSB0cmFjZVN0YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25UcmFjZVN0YXRlQ2hhbmdlZCh0cmFjZVN0YXRlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9hY3R1YWxUcmFjZVN0YXRlID0gdHJhY2VTdGF0ZTsgXHJcbiAgICAgICAgdGhpcy5yZWZyZXNoVHJhY2VDb250cm9sUGFyYW1ldGVyVmFsdWUodHJhY2VTdGF0ZSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRm9yY2VzIHN0YXJ0aW5nIHRoZSB0cmFjZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZXhlY3V0ZUZvcmNlU3RhcnQoKXtcclxuICAgICAgICBpZiAodGhpcy5fdHJhY2VDb250cm9sSW50ZXJmYWNlKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX2FjdHVhbFRyYWNlU3RhdGUgPT0gVHJhY2VTdGF0ZUlkcy5XYWl0X3N0YXJ0X3RyaWdnZXIpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdHJhY2VDb250cm9sSW50ZXJmYWNlLmNvbW1hbmRGb3JjZVN0YXJ0LmV4ZWN1dGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZvcmNlcyBzdG9wcGluZyB0aGUgdHJhY2VcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGV4ZWN1dGVGb3JjZVN0b3AoKXtcclxuICAgICAgICBpZiAodGhpcy5fdHJhY2VDb250cm9sSW50ZXJmYWNlKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX2FjdHVhbFRyYWNlU3RhdGUgPT0gVHJhY2VTdGF0ZUlkcy5XYWl0X3N0b3BfZXZlbnQpeyAvLyBPbmx5IHdoaWxlIHJ1bm5pbmdcclxuICAgICAgICAgICAgICAgIHRoaXMuX3RyYWNlQ29udHJvbEludGVyZmFjZS5jb21tYW5kRm9yY2VTdG9wLmV4ZWN1dGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNhdmVzIHRoZSB0cmFjZSBjb25maWd1cmF0aW9uIG9uIHRhcmdldFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZXhlY3V0ZVNhdmVDb25maWd1cmF0aW9uKCl7XHJcbiAgICAgICAgaWYgKHRoaXMuX3RyYWNlQ29udHJvbEludGVyZmFjZSkge1xyXG4gICAgICAgICAgICBpZih0aGlzLnNhdmVUcmFjZUNvbmZpZ1Bvc3NpYmxlSW5UaGlzU3RhdGUodGhpcy5fYWN0dWFsVHJhY2VTdGF0ZSkpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2F2ZUNvbmZpZ0lzQWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0QnV0dG9uU3RhdGVzKHRoaXMuX3RyYWNlQ29udHJvbEludGVyZmFjZSEudHJhY2VTdGF0ZS52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90cmFjZUNvbnRyb2xJbnRlcmZhY2UuY29tbWFuZFNhdmVDb25maWd1cmF0aW9uLmV4ZWN1dGUobnVsbCwocmVzdWx0KSA9PntcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zYXZlQ29uZmlnSXNBY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEJ1dHRvblN0YXRlcyh0aGlzLl90cmFjZUNvbnRyb2xJbnRlcmZhY2UhLnRyYWNlU3RhdGUudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBPcGVucyBhIGZpbGUgc2VsZWN0IGRpYWxvZyBhbmQgaW1wb3J0cyBhIHRyYWNlIGNvbmZpZ3VyYXRpb24gZnJvbSB0aGUgZmlsZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaW1wb3J0VHJhY2VDb25maWd1cmF0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5fZmlsZVByb3ZpZGVyLmV2ZW50VXBsb2FkRGF0YUZpbmlzaGVkLmF0dGFjaCh0aGlzLl91cGxvYWREYXRhRmluaXNoZWRIYW5kbGVyKTtcclxuICAgICAgICB0aGlzLl9maWxlUHJvdmlkZXIudXBsb2FkRGF0YShcIi50cmFjZWNmZ1wiKTsgLy8gT25seSBzaG93L2FjY2VwdCAqLnRyYWNlY2ZnIGZpbGVzXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFeHBvcnQgYSB0cmFjZSBjb25maWd1cmF0aW9uIHRvIGEgZmlsZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZXhwb3J0VHJhY2VDb25maWd1cmF0aW9uKCl7XHJcblxyXG4gICAgICAgIHRoaXMuX3RyYWNlQ29udHJvbEludGVyZmFjZSEuY29tbWFuZEV4cG9ydFRyYWNlQ29uZmlndXJhdGlvbi5leGVjdXRlKG51bGwsKHJlc3VsdCkgPT57XHJcbiAgICAgICAgICAgIHZhciBibG9iID0gbmV3IEJsb2IoW3Jlc3VsdF0sIHsgdHlwZTogXCJ0ZXh0L3htbFwiIH0pO1xyXG4gICAgICAgICAgICBGaWxlUHJvdmlkZXIuZG93bmxvYWREYXRhKFwiVHJhY2VDb25maS50cmFjZWNmZ1wiLCBibG9iKTtcclxuICAgICAgICB9KTtcclxuICAgIH0gIFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogT2NjdXJzIGFmdGVyIHJlYWRpbmcgZGF0YSBmcm9tIGZpbGUodHJhY2UgY29uZmlndXJhdGlvbiBpbXBvcnQgZGF0YSlcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtIVE1MSW5wdXRFbGVtZW50fSBzZW5kZXJcclxuICAgICAqIEBwYXJhbSB7TWFwPHN0cmluZywgc3RyaW5nPn0gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uVXBsb2FkRGF0YUZpbmlzaGVkKHNlbmRlcjogSFRNTElucHV0RWxlbWVudCwgYXJnczogTWFwPHN0cmluZywgc3RyaW5nPil7XHJcblx0XHQvKnRoaXMuc2V0QnVzeUluZm9ybWF0aW9uKG5ldyBCdXN5SW5mb3JtYXRpb24oXCJJbXBvcnRpbmcgZGF0YS4uLlwiLCBJbWFnZUlkLmRlZmF1bHRJbWFnZSwgNDgsIHRydWUpKTtcclxuXHRcdHRoaXMuc2V0QnVzeSh0cnVlKTsqL1xyXG5cdFx0XHJcblx0XHQvLyBUaW1lb3V0IG5lZWRlZCB0byBzaG93IHRoZSBidXN5c2NyZWVuIGJlZm9yZSBpbXBvcnRpbmcgZGF0YSBcclxuXHRcdHNldFRpbWVvdXQoKCkgPT4gdGhpcy5pbXBvcnREYXRhKHNlbmRlciwgYXJncyksIDIwMCk7XHJcblxyXG5cdFx0dGhpcy5fZmlsZVByb3ZpZGVyLmV2ZW50VXBsb2FkRGF0YUZpbmlzaGVkLmRldGFjaCh0aGlzLl91cGxvYWREYXRhRmluaXNoZWRIYW5kbGVyKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcblx0ICogaW1wb3J0cyB0aGUgZ2l2ZW4gZmlsZWRhdGEgd2l0aCB0aGUgZ2l2ZW4gZmlsZW5hbWVcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHtIVE1MSW5wdXRFbGVtZW50fSBmaWxlSW5wdXRFbGVtZW50XHJcblx0ICogQHBhcmFtIHtNYXA8c3RyaW5nLCBzdHJpbmc+fSBmaWxlQ29udGVudHNcclxuXHQgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBpbXBvcnREYXRhKGZpbGVJbnB1dEVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQsIGZpbGVDb250ZW50czogTWFwPHN0cmluZywgc3RyaW5nPil7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoZmlsZUNvbnRlbnRzLnNpemUgPT09IDEpe1xyXG4gICAgICAgICAgICBsZXQgZmlsZWRhdGEgPSBmaWxlQ29udGVudHMudmFsdWVzKCkubmV4dCgpLnZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLl90cmFjZUNvbnRyb2xJbnRlcmZhY2UhLmNvbW1hbmRJbXBvcnRUcmFjZUNvbmZpZ3VyYXRpb24uZXhlY3V0ZShmaWxlZGF0YSwocmVzdWx0KSA9PntcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHR9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZWZyZXNoZXMgdGhlIHRyYWNlIHN0YXRlIChkaXNwbGF5bmFtZSBvZiB2YWx1ZSBhbmQgdGhlIHN0YXRlIGljb24pXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJ9IHRyYWNlQ29udHJvbFBhcmFtZXRlclxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlZnJlc2hUcmFjZUNvbnRyb2xQYXJhbWV0ZXJWYWx1ZSh0cmFjZVN0YXRlOiBzdHJpbmcpIHsgICBcclxuICAgICAgICB0aGlzLnNldFRyYWNlU3RhdGVUZXh0KHRyYWNlU3RhdGUpO1xyXG4gICAgICAgIHRoaXMuc2V0VHJhY2VTdGF0ZUltYWdlKHRyYWNlU3RhdGUpO1xyXG4gICAgICAgIHRoaXMuc2V0QnV0dG9uU3RhdGVzKHRyYWNlU3RhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHRoZSBkaXNwbGF5IG5hbWUgZm9yIHRoZSB0cmFjZSBzdGF0ZSBpbiB0aGUgdmlzdWFsaXphdGlvblxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHJhY2VTdGF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldFRyYWNlU3RhdGVUZXh0KHRyYWNlU3RhdGU6IHN0cmluZyl7XHJcbiAgICAgICAgLy8gR2V0IGRpc3BsYXkgbmFtZSBmb3IgdGhlIHRyYWNlIHN0YXRlXHJcbiAgICAgICAgbGV0IHRyYWNlU3RhdGVEaXNwbGF5VGV4dCA9IFwiSW5hY3RpdmVcIjtcclxuICAgICAgICBpZih0cmFjZVN0YXRlID09IFRyYWNlU3RhdGVJZHMuQ29uZmlnX3Byb2Nlc3NpbmcgfHwgdHJhY2VTdGF0ZSA9PSBUcmFjZVN0YXRlSWRzLkNvbmZpZ19hcHBsaWVkKXtcclxuICAgICAgICAgICAgdHJhY2VTdGF0ZURpc3BsYXlUZXh0ID0gXCJBcHBseWluZyBjb25maWd1cmF0aW9uXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodHJhY2VTdGF0ZSA9PSBUcmFjZVN0YXRlSWRzLldhaXRfc3RhcnRfdHJpZ2dlcil7XHJcbiAgICAgICAgICAgIHRyYWNlU3RhdGVEaXNwbGF5VGV4dCA9IFwiV2FpdCBmb3Igc3RhcnQgdHJpZ2dlclwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHRyYWNlU3RhdGUgPT0gVHJhY2VTdGF0ZUlkcy5XYWl0X3N0b3BfZXZlbnQpe1xyXG4gICAgICAgICAgICB0cmFjZVN0YXRlRGlzcGxheVRleHQgPSBcIlJ1bm5pbmdcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih0cmFjZVN0YXRlID09IFRyYWNlU3RhdGVJZHMuRGF0YV9hdmFpbGFibGUpe1xyXG4gICAgICAgICAgICB0cmFjZVN0YXRlRGlzcGxheVRleHQgPSBcIkRhdGEgYXZhaWxhYmxlXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodHJhY2VTdGF0ZSA9PSBUcmFjZVN0YXRlSWRzLlJlY29yZF9mYWlsdXJlKXtcclxuICAgICAgICAgICAgdHJhY2VTdGF0ZURpc3BsYXlUZXh0ID0gXCJSZWNvcmQgZmFpbGVkXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIFNldCBkaXNwbGF5IG5hbWUgZm9yIHRoZSB0cmFjZSBzdGF0ZVxyXG4gICAgICAgICg8YW55PiQoXCIjXCIgKyB0aGlzLl9zdGF0ZUZpZWxkSWQpKS5lakJ1dHRvbih7XHJcbiAgICAgICAgICAgIHRleHQ6ICB0cmFjZVN0YXRlRGlzcGxheVRleHQsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIGFuIGltYWdlIGZvciB0aGUgdHJhY2Ugc3RhdGUgaW4gdGhlIHZpc3VhbGl6YXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRyYWNlU3RhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRUcmFjZVN0YXRlSW1hZ2UodHJhY2VTdGF0ZTpzdHJpbmcpe1xyXG4gICAgICAgIC8vIEdldCBpbWFnZSBmb3IgdGhlIHRyYWNlIHN0YXRlXHJcbiAgICAgICAgbGV0IGltYWdlcGF0aCA9ICB0aGlzLmdldEltYWdlUGF0aChcImluYWN0aXZlLnN2Z1wiKTtcclxuICAgICAgICBpZih0cmFjZVN0YXRlID09VHJhY2VTdGF0ZUlkcy5XYWl0X3N0YXJ0X3RyaWdnZXIpeyBcclxuICAgICAgICAgICAgaW1hZ2VwYXRoID0gIHRoaXMuZ2V0SW1hZ2VQYXRoKFwid2FpdF9zdGFydF90cmlnZ2VyLnN2Z1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih0cmFjZVN0YXRlID09IFRyYWNlU3RhdGVJZHMuV2FpdF9zdG9wX2V2ZW50KXtcclxuICAgICAgICAgICAgaW1hZ2VwYXRoID0gIHRoaXMuZ2V0SW1hZ2VQYXRoKFwid2FpdF9zdG9wX2V2ZW50LnN2Z1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih0cmFjZVN0YXRlID09IFRyYWNlU3RhdGVJZHMuRGF0YV9hdmFpbGFibGUpe1xyXG4gICAgICAgICAgICBpbWFnZXBhdGggPSAgdGhpcy5nZXRJbWFnZVBhdGgoXCJkYXRhX2F2YWlsYWJsZS5zdmdcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTZXQgaW1hZ2UgZm9yIHRoZSB0cmFjZSBzdGF0ZVxyXG4gICAgICAgIGxldCBpbWFnZUVsZW1lbnQgPSAkKFwiI1wiICsgdGhpcy5fc3RhdGVJbWFnZSlbMF07XHJcbiAgICAgICAgaWYoaW1hZ2VFbGVtZW50ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGltYWdlRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcInVybCgnXCIgKyBpbWFnZXBhdGggK1wiJylcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBzdGF0ZXMoZW5hYmxlZC9kaXNhYmxlZCkgb2YgdGhlIGJ1dHRvbnMgZm9yIHRoZSBnaXZlbiB0cmFjZSBzdGF0ZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHJhY2VTdGF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldEJ1dHRvblN0YXRlcyh0cmFjZVN0YXRlOiBzdHJpbmcpe1xyXG4gICAgICAgIGlmKHRyYWNlU3RhdGUgPT0gVHJhY2VTdGF0ZUlkcy5XYWl0X3N0YXJ0X3RyaWdnZXIpe1xyXG4gICAgICAgICAgICB0aGlzLnNldEJ1dHRvblN0YXRlSW5XYWl0U3RhcnRUcmlnZ2VyU3RhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih0cmFjZVN0YXRlID09IFRyYWNlU3RhdGVJZHMuV2FpdF9zdG9wX2V2ZW50KXtcclxuICAgICAgICAgICAgdGhpcy5zZXRCdXR0b25TdGF0ZUluV2FpdFN0b3BFdmVudFN0YXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuc2F2ZVRyYWNlQ29uZmlnUG9zc2libGVJblRoaXNTdGF0ZSh0cmFjZVN0YXRlKSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlYWN0aXZhdGVCdXR0b24odGhpcy5fc2F2ZVRyYWNlQ29uZmlndXJhdGlvbkJ1dHRvbklkLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gb3RoZXIgc3RhdGUgPT4gZGVhY3RpdmF0ZSBmb3JjZSBzdGFydCB0cmlnZ2VyIGFuZCBmb3JjZSBzdG9wIGV2ZW50XHJcbiAgICAgICAgICAgIHRoaXMuZGVhY3RpdmF0ZUJ1dHRvbih0aGlzLl9mb3JjZVN0YXJ0QnV0dG9uSWQsIHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLmRlYWN0aXZhdGVCdXR0b24odGhpcy5fZm9yY2VTdG9wQnV0dG9uSWQsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgLy8gc2V0IGFjdGl2YXRlIGJ1dHRvbiBzdGF0ZVxyXG4gICAgICAgICAgICBpZih0aGlzLl9hY3RpdmF0ZUlzQWN0aXZlID09IGZhbHNlICYmIHRoaXMuX3NhdmVDb25maWdJc0FjdGl2ZSA9PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlYWN0aXZhdGVCdXR0b24odGhpcy5fYWN0aXZhdGVCdXR0b25JZCwgZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlYWN0aXZhdGVCdXR0b24odGhpcy5fYWN0aXZhdGVCdXR0b25JZCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgYnV0dG9uIHN0YXRlcyBpZiB0aGUgdHJhY2Ugc3RhdGUgaXMgd2FpdGluZyBmb3Igc3RhcnQgdHJpZ2dlclxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0QnV0dG9uU3RhdGVJbldhaXRTdGFydFRyaWdnZXJTdGF0ZSgpe1xyXG4gICAgICAgIC8vIFdhaXQgZm9yIHN0YXJ0IHRyaWdnZXIgPT4gYWN0aXZhdGUgZm9yY2Ugc3RhcnQ7IGRlYWN0aXZhdGUgZm9yY2Ugc3RvcCBldmVudFxyXG4gICAgICAgIHRoaXMuZGVhY3RpdmF0ZUJ1dHRvbih0aGlzLl9mb3JjZVN0YXJ0QnV0dG9uSWQsIGZhbHNlKTtcclxuICAgICAgICB0aGlzLmRlYWN0aXZhdGVCdXR0b24odGhpcy5fZm9yY2VTdG9wQnV0dG9uSWQsIHRydWUpO1xyXG4gICAgICAgIHRoaXMuZGVhY3RpdmF0ZUJ1dHRvbih0aGlzLl9zYXZlVHJhY2VDb25maWd1cmF0aW9uQnV0dG9uSWQsIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgYnV0dG9uIHN0YXRlcyBpZiB0aGUgdHJhY2Ugc3RhdGUgaXMgd2FpdGluZyBmb3IgdGhlIHN0b3AgZXZlbnRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldEJ1dHRvblN0YXRlSW5XYWl0U3RvcEV2ZW50U3RhdGUoKXtcclxuICAgICAgICAvLyBSdW5uaW5nID0+IGRlYWN0aXZhdGUgZm9yY2Ugc3RhcnQgdHJpZ2dlcjsgYWN0aXZhdGUgZm9yY2Ugc3RvcCBldmVudFxyXG4gICAgICAgIHRoaXMuZGVhY3RpdmF0ZUJ1dHRvbih0aGlzLl9mb3JjZVN0YXJ0QnV0dG9uSWQsIHRydWUpO1xyXG4gICAgICAgIHRoaXMuZGVhY3RpdmF0ZUJ1dHRvbih0aGlzLl9mb3JjZVN0b3BCdXR0b25JZCwgZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuZGVhY3RpdmF0ZUJ1dHRvbih0aGlzLl9zYXZlVHJhY2VDb25maWd1cmF0aW9uQnV0dG9uSWQsIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgaW1hZ2VQYXRoIGZvciB0aGUgZ2l2ZW4gaW1hZ2VOYW1lIGFuZCBzdGF0ZShhY3RpdmF0ZWQvZGVhY3RpdmF0ZWQpXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpbWFnZU5hbWVcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2RlYWN0aXZhdGVkPWZhbHNlXVxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRJbWFnZVBhdGgoaW1hZ2VOYW1lOiBzdHJpbmcsIGRlYWN0aXZhdGVkOiBib29sZWFuID0gZmFsc2UpOnN0cmluZ3tcclxuICAgICAgICBpZihkZWFjdGl2YXRlZCA9PSB0cnVlKXtcclxuICAgICAgICAgICAgaW1hZ2VOYW1lID0gaW1hZ2VOYW1lLnJlcGxhY2UoXCIuc3ZnXCIsIFwiX2RlYWN0aXZhdGVkLnN2Z1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFRoZW1lUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5nZXRUaGVtZWRGaWxlUGF0aChcIndpZGdldHMvdHJhY2VDb250cm9sV2lkZ2V0L3N0eWxlL2ltYWdlcy9cIiArIGltYWdlTmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm4gdHJ1ZSBpZiBzYXZlaW5nIG9mIHRyYWNlIGNvbmZpZ3VyYXRpb24gaXMgcG9zc2libGUgaW4gdGhlIGN1cnJlbnQgdHJhY2Ugc3RhdGVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBzdGF0ZVxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2F2ZVRyYWNlQ29uZmlnUG9zc2libGVJblRoaXNTdGF0ZShzdGF0ZSk6IGJvb2xlYW57XHJcbiAgICAgICAgaWYoc3RhdGUgPT0gVHJhY2VTdGF0ZUlkcy5EaXNhYmxlZCB8fCBzdGF0ZSA9PSBUcmFjZVN0YXRlSWRzLkRhdGFfYXZhaWxhYmxlIHx8IHN0YXRlID09IFRyYWNlU3RhdGVJZHMuUmVjb3JkX2ZhaWx1cmUpe1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBUcmFjZUNvbnRyb2xXaWRnZXQgfTsiXX0=