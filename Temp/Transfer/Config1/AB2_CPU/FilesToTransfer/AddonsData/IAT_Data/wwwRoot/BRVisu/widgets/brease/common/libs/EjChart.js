define(['widgets/brease/common/libs/EjChartCache', 'widgets/brease/common/libs/external/syncfusion/datavisualization/ej.chart'], function (EjChartCache) {
    'use strict';
    /**
    * @class widgets.brease.common.libs.EjChart
    * wrapper class for syncfusion ejchart adds a
    * custom extension to reduce calculations
    * @extends Object
    * @singleton
    */
    var EjChart = function () {},
        p = EjChart.prototype;
    /**
    * @method init
    * @param {HTMLElement} el
    * jquery reference to a wrapper element where the chart 
    * should be inserted
    * @param {Object} model
    * options for syncfusion ejchart
    */
    p.init = function (el, model) {
        el.ejChart(model);
        var chart = el.ejChart('instance');
        chart.chartExtensions = {
            cache: new EjChartCache()
        };
    };
    var instance = new EjChart();
    return instance;
});
