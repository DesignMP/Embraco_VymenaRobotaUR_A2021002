define(["require", "exports", "./mappCockpitDataModel/mappCockpitDataModel", "./configManagerDataModel/configManagerDataModel", "./signalManagerDataModel/signalManagerDataModel", "./chartManagerDataModel/chartManagerDataModel"], function (require, exports, mappCockpitDataModel_1, configManagerDataModel_1, signalManagerDataModel_1, chartManagerDataModel_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MappCockpitDataModel = /** @class */ (function () {
        function MappCockpitDataModel() {
        }
        MappCockpitDataModel.create = function () { return new mappCockpitDataModel_1.MappCockpitDataModel(); };
        ;
        return MappCockpitDataModel;
    }());
    exports.MappCockpitDataModel = MappCockpitDataModel;
    var ConfigManagerDataModel = /** @class */ (function () {
        function ConfigManagerDataModel() {
        }
        ConfigManagerDataModel.create = function () { return new configManagerDataModel_1.ConfigManagerDataModel(); };
        ;
        return ConfigManagerDataModel;
    }());
    exports.ConfigManagerDataModel = ConfigManagerDataModel;
    var SignalManagerDataModel = /** @class */ (function () {
        function SignalManagerDataModel() {
        }
        SignalManagerDataModel.create = function () { return new signalManagerDataModel_1.SignalManagerDataModel(); };
        ;
        return SignalManagerDataModel;
    }());
    exports.SignalManagerDataModel = SignalManagerDataModel;
    var ChartManagerDataModel = /** @class */ (function () {
        function ChartManagerDataModel() {
        }
        ChartManagerDataModel.create = function () { return new chartManagerDataModel_1.ChartManagerDataModel(); };
        ;
        return ChartManagerDataModel;
    }());
    exports.ChartManagerDataModel = ChartManagerDataModel;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YU1vZGVscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2RhdGFNb2RlbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBR0E7UUFBQTtRQUE0SCxDQUFDO1FBQWpGLDJCQUFNLEdBQWIsY0FBc0MsT0FBTyxJQUFJLDJDQUFrQyxFQUFFLENBQUEsQ0FBQSxDQUFDO1FBQUEsQ0FBQztRQUFBLDJCQUFDO0lBQUQsQ0FBQyxBQUE3SCxJQUE2SDtJQWNySCxvREFBb0I7SUFWNUI7UUFBQTtRQUFrSSxDQUFDO1FBQXJGLDZCQUFNLEdBQWIsY0FBd0MsT0FBTyxJQUFJLCtDQUFvQyxFQUFFLENBQUEsQ0FBQSxDQUFDO1FBQUEsQ0FBQztRQUFBLDZCQUFDO0lBQUQsQ0FBQyxBQUFuSSxJQUFtSTtJQVcvSCx3REFBc0I7SUFQMUI7UUFBQTtRQUFrSSxDQUFDO1FBQXJGLDZCQUFNLEdBQWIsY0FBd0MsT0FBTyxJQUFJLCtDQUFvQyxFQUFFLENBQUEsQ0FBQSxDQUFDO1FBQUEsQ0FBQztRQUFBLDZCQUFDO0lBQUQsQ0FBQyxBQUFuSSxJQUFtSTtJQVEvSCx3REFBc0I7SUFKMUI7UUFBQTtRQUErSCxDQUFDO1FBQW5GLDRCQUFNLEdBQWIsY0FBdUMsT0FBTyxJQUFJLDZDQUFtQyxFQUFFLENBQUEsQ0FBQSxDQUFDO1FBQUEsQ0FBQztRQUFBLDRCQUFDO0lBQUQsQ0FBQyxBQUFoSSxJQUFnSTtJQUs1SCxzREFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHsgTWFwcENvY2twaXREYXRhTW9kZWwgYXMgIE1hcHBDb2NrcGl0RGF0YU1vZGVsSW1wbGVtZW50YXRpb259IGZyb20gXCIuL21hcHBDb2NrcGl0RGF0YU1vZGVsL21hcHBDb2NrcGl0RGF0YU1vZGVsXCI7XHJcbmltcG9ydCB7IElNYXBwQ29ja3BpdERhdGFNb2RlbCB9IGZyb20gXCIuL21hcHBDb2NrcGl0RGF0YU1vZGVsL21hcHBDb2NrcGl0RGF0YU1vZGVsSW50ZXJmYWNlXCI7XHJcbmFic3RyYWN0IGNsYXNzIE1hcHBDb2NrcGl0RGF0YU1vZGVseyBzdGF0aWMgY3JlYXRlKCk6SU1hcHBDb2NrcGl0RGF0YU1vZGVse3JldHVybiBuZXcgTWFwcENvY2twaXREYXRhTW9kZWxJbXBsZW1lbnRhdGlvbigpfTt9XHJcblxyXG5pbXBvcnQgeyBDb25maWdNYW5hZ2VyRGF0YU1vZGVsIGFzICBDb25maWdNYW5hZ2VyRGF0YU1vZGVsSW1wbGVtZW50YXRpb259IGZyb20gXCIuL2NvbmZpZ01hbmFnZXJEYXRhTW9kZWwvY29uZmlnTWFuYWdlckRhdGFNb2RlbFwiO1xyXG5pbXBvcnQgeyBJQ29uZmlnTWFuYWdlckRhdGFNb2RlbCB9IGZyb20gXCIuL2NvbmZpZ01hbmFnZXJEYXRhTW9kZWwvaW50ZXJmYWNlcy9jb25maWdNYW5hZ2VyRGF0YU1vZGVsSW50ZXJmYWNlXCI7XHJcbmFic3RyYWN0IGNsYXNzIENvbmZpZ01hbmFnZXJEYXRhTW9kZWx7IHN0YXRpYyBjcmVhdGUoKTpJQ29uZmlnTWFuYWdlckRhdGFNb2RlbHtyZXR1cm4gbmV3IENvbmZpZ01hbmFnZXJEYXRhTW9kZWxJbXBsZW1lbnRhdGlvbigpfTt9XHJcblxyXG5pbXBvcnQgeyBTaWduYWxNYW5hZ2VyRGF0YU1vZGVsIGFzICBTaWduYWxNYW5hZ2VyRGF0YU1vZGVsSW1wbGVtZW50YXRpb259IGZyb20gXCIuL3NpZ25hbE1hbmFnZXJEYXRhTW9kZWwvc2lnbmFsTWFuYWdlckRhdGFNb2RlbFwiO1xyXG5pbXBvcnQgeyBJU2lnbmFsTWFuYWdlckRhdGFNb2RlbCB9IGZyb20gXCIuL3NpZ25hbE1hbmFnZXJEYXRhTW9kZWwvaW50ZXJmYWNlcy9zaWduYWxNYW5hZ2VyRGF0YU1vZGVsSW50ZXJmYWNlXCI7XHJcbmFic3RyYWN0IGNsYXNzIFNpZ25hbE1hbmFnZXJEYXRhTW9kZWx7IHN0YXRpYyBjcmVhdGUoKTpJU2lnbmFsTWFuYWdlckRhdGFNb2RlbHtyZXR1cm4gbmV3IFNpZ25hbE1hbmFnZXJEYXRhTW9kZWxJbXBsZW1lbnRhdGlvbigpfTt9XHJcblxyXG5pbXBvcnQgeyBDaGFydE1hbmFnZXJEYXRhTW9kZWwgYXMgIENoYXJ0TWFuYWdlckRhdGFNb2RlbEltcGxlbWVudGF0aW9ufSBmcm9tIFwiLi9jaGFydE1hbmFnZXJEYXRhTW9kZWwvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsXCI7XHJcbmltcG9ydCB7IElDaGFydE1hbmFnZXJEYXRhTW9kZWwgfSBmcm9tIFwiLi9jaGFydE1hbmFnZXJEYXRhTW9kZWwvaW50ZXJmYWNlcy9jaGFydE1hbmFnZXJEYXRhTW9kZWxJbnRlcmZhY2VcIjtcclxuYWJzdHJhY3QgY2xhc3MgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVseyBzdGF0aWMgY3JlYXRlKCk6SUNoYXJ0TWFuYWdlckRhdGFNb2RlbHtyZXR1cm4gbmV3IENoYXJ0TWFuYWdlckRhdGFNb2RlbEltcGxlbWVudGF0aW9uKCl9O31cclxuXHJcbmV4cG9ydCB7TWFwcENvY2twaXREYXRhTW9kZWwsSU1hcHBDb2NrcGl0RGF0YU1vZGVsLFxyXG4gICAgQ29uZmlnTWFuYWdlckRhdGFNb2RlbCxJQ29uZmlnTWFuYWdlckRhdGFNb2RlbCxcclxuICAgIFNpZ25hbE1hbmFnZXJEYXRhTW9kZWwsSVNpZ25hbE1hbmFnZXJEYXRhTW9kZWwsXHJcbiAgICBDaGFydE1hbmFnZXJEYXRhTW9kZWwsSUNoYXJ0TWFuYWdlckRhdGFNb2RlbCxcclxufSJdfQ==