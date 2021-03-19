define(["require", "exports", "../userInteractionController", "../../ChartBase"], function (require, exports, userInteractionController_1, ChartBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AxisPanningStrategy = /** @class */ (function () {
        function AxisPanningStrategy(userInteractionController) {
            this.dragIsActive = false;
            this.currentDragChart = undefined;
            this.userInteractionController = userInteractionController;
        }
        AxisPanningStrategy.prototype.onMouseHover = function (chart, chartObjectTypeUnderMouse) {
            //TODO: remove direct chart access and move this to setCursor Method in Chart
            if (chartObjectTypeUnderMouse.chartObjectType == ChartBase_1.ChartObjectType.axis) {
                $(chart.cssParentContentId).css("cursor", "pointer");
                $(chart.cssParentContentId + "_canvas").css("cursor", "pointer");
            }
            else {
                $(chart.cssParentContentId).css("cursor", "default");
                $(chart.cssParentContentId + "_canvas").css("cursor", "default");
            }
        };
        AxisPanningStrategy.prototype.onClick = function (chart) {
        };
        AxisPanningStrategy.prototype.onMouseDown = function (chart, chartObjectTypeUnderMouse) {
            if (this.dragIsActive == false) {
                if (chartObjectTypeUnderMouse.args.axis != undefined) {
                    this.userInteractionController.executeCommand(new userInteractionController_1.EventExecuteChartCommandArgs(this, userInteractionController_1.ChartCommandType.togglePanning, chart, { boxZoomEnabled: false }));
                    this.userInteractionController.executeCommand(new userInteractionController_1.EventExecuteChartCommandArgs(this, userInteractionController_1.ChartCommandType.toggleBoxZoom, chart, { panningEnabled: false }));
                    this.userInteractionController.executeCommand(new userInteractionController_1.EventExecuteChartCommandArgs(this, userInteractionController_1.ChartCommandType.selectPanningAxes, chart, { zoomAxes: chartObjectTypeUnderMouse.args.axis }));
                }
            }
            return chartObjectTypeUnderMouse;
        };
        AxisPanningStrategy.prototype.onDrag = function (chart, args) {
            if (this.currentDragChart == undefined || chart == this.currentDragChart) {
                if (args.objectUnderMouse.chartObjectType == ChartBase_1.ChartObjectType.axis || this.dragIsActive == true) {
                    this.userInteractionController.executeCommand(new userInteractionController_1.EventExecuteChartCommandArgs(this, userInteractionController_1.ChartCommandType.panChart, chart, { args: args }));
                    this.dragIsActive = true;
                    this.currentDragChart = chart;
                }
            }
            if (this.dragIsActive == false) {
                if (args.objectUnderMouse.args.axis != undefined) {
                    this.userInteractionController.executeCommand(new userInteractionController_1.EventExecuteChartCommandArgs(this, userInteractionController_1.ChartCommandType.selectPanningAxes, chart, { zoomAxes: args.chartObjectUnderMouse.args.axis }));
                }
            }
        };
        AxisPanningStrategy.prototype.onDragEnd = function (chart) {
            this.userInteractionController.executeCommand(new userInteractionController_1.EventExecuteChartCommandArgs(this, userInteractionController_1.ChartCommandType.endCursorDrag, chart, {}));
            this.dragIsActive = false;
            this.currentDragChart = undefined;
            this.userInteractionController.executeCommand(new userInteractionController_1.EventExecuteChartCommandArgs(this, userInteractionController_1.ChartCommandType.resetDragPosition, null, {}));
        };
        return AxisPanningStrategy;
    }());
    exports.AxisPanningStrategy = AxisPanningStrategy;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXhpc1Bhbm5pbmdTdHJhdGVneS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jaGFydFdpZGdldC91c2VySW50ZXJhY3Rpb24vc3RyYXRlZ2llcy9heGlzUGFubmluZ1N0cmF0ZWd5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQU1BO1FBUUksNkJBQVkseUJBQXFEO1lBSmpFLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1lBQ2IscUJBQWdCLEdBQTBCLFNBQVMsQ0FBQztZQUl4RCxJQUFJLENBQUMseUJBQXlCLEdBQUcseUJBQXlCLENBQUM7UUFDL0QsQ0FBQztRQUVELDBDQUFZLEdBQVosVUFBYSxLQUFrQixFQUFFLHlCQUFpRDtZQUM5RSw2RUFBNkU7WUFDN0UsSUFBRyx5QkFBeUIsQ0FBQyxlQUFlLElBQUksMkJBQWUsQ0FBQyxJQUFJLEVBQUM7Z0JBQ2pFLENBQUMsQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO2dCQUNyRCxDQUFDLENBQUMsS0FBSyxDQUFDLGtCQUFrQixHQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7YUFDbEU7aUJBQ0c7Z0JBQ0EsQ0FBQyxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7Z0JBQ3JELENBQUMsQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEdBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQzthQUNsRTtRQUNMLENBQUM7UUFFRCxxQ0FBTyxHQUFQLFVBQVEsS0FBa0I7UUFFMUIsQ0FBQztRQUVELHlDQUFXLEdBQVgsVUFBWSxLQUFrQixFQUFFLHlCQUFpRDtZQUU3RSxJQUFHLElBQUksQ0FBQyxZQUFZLElBQUksS0FBSyxFQUFDO2dCQUMxQixJQUFHLHlCQUF5QixDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksU0FBUyxFQUFDO29CQUNoRCxJQUFJLENBQUMseUJBQXlCLENBQUMsY0FBYyxDQUFDLElBQUksd0RBQTRCLENBQUMsSUFBSSxFQUFFLDRDQUFnQixDQUFDLGFBQWEsRUFBRSxLQUFLLEVBQUUsRUFBQyxjQUFjLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQyxDQUFBO29CQUNySixJQUFJLENBQUMseUJBQXlCLENBQUMsY0FBYyxDQUFDLElBQUksd0RBQTRCLENBQUMsSUFBSSxFQUFFLDRDQUFnQixDQUFDLGFBQWEsRUFBRSxLQUFLLEVBQUUsRUFBQyxjQUFjLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQyxDQUFBO29CQUNySixJQUFJLENBQUMseUJBQXlCLENBQUMsY0FBYyxDQUFDLElBQUksd0RBQTRCLENBQUMsSUFBSSxFQUFFLDRDQUFnQixDQUFDLGlCQUFpQixFQUFFLEtBQUssRUFBRSxFQUFDLFFBQVEsRUFBRSx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQyxDQUFBO2lCQUNwTDthQUNKO1lBRUQsT0FBTyx5QkFBeUIsQ0FBQztRQUNyQyxDQUFDO1FBR0Qsb0NBQU0sR0FBTixVQUFPLEtBQWtCLEVBQUUsSUFBSTtZQUMzQixJQUFHLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxTQUFTLElBQUcsS0FBSyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBQztnQkFDbkUsSUFBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxJQUFJLDJCQUFlLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxFQUFDO29CQUMxRixJQUFJLENBQUMseUJBQXlCLENBQUMsY0FBYyxDQUFDLElBQUksd0RBQTRCLENBQUMsSUFBSSxFQUFFLDRDQUFnQixDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBQyxJQUFJLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQyxDQUFBO29CQUNySSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztvQkFDekIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQztpQkFFakM7YUFDSjtZQUNELElBQUcsSUFBSSxDQUFDLFlBQVksSUFBSSxLQUFLLEVBQUM7Z0JBQzFCLElBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksU0FBUyxFQUFDO29CQUM1QyxJQUFJLENBQUMseUJBQXlCLENBQUMsY0FBYyxDQUFDLElBQUksd0RBQTRCLENBQUMsSUFBSSxFQUFFLDRDQUFnQixDQUFDLGlCQUFpQixFQUFFLEtBQUssRUFBRSxFQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLElBQUksRUFBQyxDQUFDLENBQUMsQ0FBQTtpQkFDckw7YUFDSjtRQUNMLENBQUM7UUFFRCx1Q0FBUyxHQUFULFVBQVUsS0FBa0I7WUFDeEIsSUFBSSxDQUFDLHlCQUF5QixDQUFDLGNBQWMsQ0FBQyxJQUFJLHdEQUE0QixDQUFDLElBQUksRUFBRSw0Q0FBZ0IsQ0FBQyxhQUFhLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUE7WUFDaEksSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7WUFDMUIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLFNBQVMsQ0FBQztZQUNsQyxJQUFJLENBQUMseUJBQXlCLENBQUMsY0FBYyxDQUFDLElBQUksd0RBQTRCLENBQUMsSUFBSSxFQUFFLDRDQUFnQixDQUFDLGlCQUFpQixFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3hJLENBQUM7UUFJTCwwQkFBQztJQUFELENBQUMsQUFuRUQsSUFtRUM7SUFJTyxrREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJQ2hhcnRJbnRlcmFjdGlvblN0cmF0ZWd5IH0gZnJvbSBcIi4vY2hhclN0cmF0ZWd5SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IENoYXJ0Q29tbWFuZFR5cGUsIEV2ZW50RXhlY3V0ZUNoYXJ0Q29tbWFuZEFyZ3MgfSBmcm9tIFwiLi4vdXNlckludGVyYWN0aW9uQ29udHJvbGxlclwiO1xyXG5pbXBvcnQgeyBJVXNlckludGVyYWN0aW9uQ29udHJvbGxlciB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2NvbnRyb2xsZXJJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVRyYWNlQ2hhcnQgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy90cmFjZUNoYXJ0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IENoYXJ0T2JqZWN0VHlwZSwgQ2hhcnRPYmplY3RJbmZvcm1hdGlvbiB9IGZyb20gXCIuLi8uLi9DaGFydEJhc2VcIjtcclxuXHJcbmNsYXNzICBBeGlzUGFubmluZ1N0cmF0ZWd5IGltcGxlbWVudHMgSUNoYXJ0SW50ZXJhY3Rpb25TdHJhdGVneXtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSB1c2VySW50ZXJhY3Rpb25Db250cm9sbGVyOiBJVXNlckludGVyYWN0aW9uQ29udHJvbGxlcjtcclxuICAgIFxyXG4gICAgZHJhZ0lzQWN0aXZlID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIGN1cnJlbnREcmFnQ2hhcnQ6IElUcmFjZUNoYXJ0fHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuXHJcblxyXG4gICAgY29uc3RydWN0b3IodXNlckludGVyYWN0aW9uQ29udHJvbGxlcjogSVVzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXIpIHtcclxuICAgICAgICB0aGlzLnVzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXIgPSB1c2VySW50ZXJhY3Rpb25Db250cm9sbGVyO1xyXG4gICAgfVxyXG5cclxuICAgIG9uTW91c2VIb3ZlcihjaGFydDogSVRyYWNlQ2hhcnQsIGNoYXJ0T2JqZWN0VHlwZVVuZGVyTW91c2U6IENoYXJ0T2JqZWN0SW5mb3JtYXRpb24pIHtcclxuICAgICAgICAvL1RPRE86IHJlbW92ZSBkaXJlY3QgY2hhcnQgYWNjZXNzIGFuZCBtb3ZlIHRoaXMgdG8gc2V0Q3Vyc29yIE1ldGhvZCBpbiBDaGFydFxyXG4gICAgICAgIGlmKGNoYXJ0T2JqZWN0VHlwZVVuZGVyTW91c2UuY2hhcnRPYmplY3RUeXBlID09IENoYXJ0T2JqZWN0VHlwZS5heGlzKXtcclxuICAgICAgICAgICAgJChjaGFydC5jc3NQYXJlbnRDb250ZW50SWQpLmNzcyhcImN1cnNvclwiLCBcInBvaW50ZXJcIik7XHJcbiAgICAgICAgICAgICQoY2hhcnQuY3NzUGFyZW50Q29udGVudElkK1wiX2NhbnZhc1wiKS5jc3MoXCJjdXJzb3JcIiwgXCJwb2ludGVyXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAkKGNoYXJ0LmNzc1BhcmVudENvbnRlbnRJZCkuY3NzKFwiY3Vyc29yXCIsIFwiZGVmYXVsdFwiKTtcclxuICAgICAgICAgICAgJChjaGFydC5jc3NQYXJlbnRDb250ZW50SWQrXCJfY2FudmFzXCIpLmNzcyhcImN1cnNvclwiLCBcImRlZmF1bHRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBvbkNsaWNrKGNoYXJ0OiBJVHJhY2VDaGFydCkge1xyXG4gICAgICBcclxuICAgIH0gICBcclxuICAgIFxyXG4gICAgb25Nb3VzZURvd24oY2hhcnQ6IElUcmFjZUNoYXJ0LCBjaGFydE9iamVjdFR5cGVVbmRlck1vdXNlOiBDaGFydE9iamVjdEluZm9ybWF0aW9uKTogQ2hhcnRPYmplY3RJbmZvcm1hdGlvbntcclxuICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMuZHJhZ0lzQWN0aXZlID09IGZhbHNlKXtcclxuICAgICAgICAgICAgaWYoY2hhcnRPYmplY3RUeXBlVW5kZXJNb3VzZS5hcmdzLmF4aXMgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIHRoaXMudXNlckludGVyYWN0aW9uQ29udHJvbGxlci5leGVjdXRlQ29tbWFuZChuZXcgRXZlbnRFeGVjdXRlQ2hhcnRDb21tYW5kQXJncyh0aGlzLCBDaGFydENvbW1hbmRUeXBlLnRvZ2dsZVBhbm5pbmcsIGNoYXJ0LCB7Ym94Wm9vbUVuYWJsZWQ6IGZhbHNlfSkpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnVzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXIuZXhlY3V0ZUNvbW1hbmQobmV3IEV2ZW50RXhlY3V0ZUNoYXJ0Q29tbWFuZEFyZ3ModGhpcywgQ2hhcnRDb21tYW5kVHlwZS50b2dnbGVCb3hab29tLCBjaGFydCwge3Bhbm5pbmdFbmFibGVkOiBmYWxzZX0pKSAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLnVzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXIuZXhlY3V0ZUNvbW1hbmQobmV3IEV2ZW50RXhlY3V0ZUNoYXJ0Q29tbWFuZEFyZ3ModGhpcywgQ2hhcnRDb21tYW5kVHlwZS5zZWxlY3RQYW5uaW5nQXhlcywgY2hhcnQsIHt6b29tQXhlczogY2hhcnRPYmplY3RUeXBlVW5kZXJNb3VzZS5hcmdzLmF4aXN9KSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGNoYXJ0T2JqZWN0VHlwZVVuZGVyTW91c2U7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICBvbkRyYWcoY2hhcnQ6IElUcmFjZUNoYXJ0LCBhcmdzKSB7XHJcbiAgICAgICAgaWYodGhpcy5jdXJyZW50RHJhZ0NoYXJ0ID09IHVuZGVmaW5lZCB8fGNoYXJ0ID09IHRoaXMuY3VycmVudERyYWdDaGFydCl7XHJcbiAgICAgICAgICAgIGlmKGFyZ3Mub2JqZWN0VW5kZXJNb3VzZS5jaGFydE9iamVjdFR5cGUgPT0gQ2hhcnRPYmplY3RUeXBlLmF4aXMgfHwgdGhpcy5kcmFnSXNBY3RpdmUgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXIuZXhlY3V0ZUNvbW1hbmQobmV3IEV2ZW50RXhlY3V0ZUNoYXJ0Q29tbWFuZEFyZ3ModGhpcywgQ2hhcnRDb21tYW5kVHlwZS5wYW5DaGFydCwgY2hhcnQsIHthcmdzOiBhcmdzfSkpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYWdJc0FjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnREcmFnQ2hhcnQgPSBjaGFydDtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5kcmFnSXNBY3RpdmUgPT0gZmFsc2Upe1xyXG4gICAgICAgICAgICBpZihhcmdzLm9iamVjdFVuZGVyTW91c2UuYXJncy5heGlzICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXIuZXhlY3V0ZUNvbW1hbmQobmV3IEV2ZW50RXhlY3V0ZUNoYXJ0Q29tbWFuZEFyZ3ModGhpcywgQ2hhcnRDb21tYW5kVHlwZS5zZWxlY3RQYW5uaW5nQXhlcywgY2hhcnQsIHt6b29tQXhlczogYXJncy5jaGFydE9iamVjdFVuZGVyTW91c2UuYXJncy5heGlzfSkpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25EcmFnRW5kKGNoYXJ0OiBJVHJhY2VDaGFydCl7XHJcbiAgICAgICAgdGhpcy51c2VySW50ZXJhY3Rpb25Db250cm9sbGVyLmV4ZWN1dGVDb21tYW5kKG5ldyBFdmVudEV4ZWN1dGVDaGFydENvbW1hbmRBcmdzKHRoaXMsIENoYXJ0Q29tbWFuZFR5cGUuZW5kQ3Vyc29yRHJhZywgY2hhcnQsIHt9KSlcclxuICAgICAgICB0aGlzLmRyYWdJc0FjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY3VycmVudERyYWdDaGFydCA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLnVzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXIuZXhlY3V0ZUNvbW1hbmQobmV3IEV2ZW50RXhlY3V0ZUNoYXJ0Q29tbWFuZEFyZ3ModGhpcywgQ2hhcnRDb21tYW5kVHlwZS5yZXNldERyYWdQb3NpdGlvbiwgbnVsbCAse30pKTtcclxuICAgIH1cclxuXHJcblxyXG5cclxufVxyXG5cclxuXHJcblxyXG5leHBvcnQge0F4aXNQYW5uaW5nU3RyYXRlZ3l9Il19