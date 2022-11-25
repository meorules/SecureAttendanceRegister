<template>
    <body>
        <Doughnut></Doughnut>   
    </body>  
</template>

<style>
</style>
  
<script>
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let vue = require("vue");
    let vueChart = require("vue-chartjs");
    let chartJs = require("chart.js");
    chartJs.Chart.register(chartJs.Title, chartJs.Tooltip, chartJs.Legend, chartJs.ArcElement, chartJs.CategoryScale);
    exports.default = (0, vue.defineComponent)({
    name: 'DoughnutChart',
    components: {
        Doughnut: vueChart.Doughnut
    },
    data() {
      return {
        notAttendedCounter: 0,
        attendedCounter: 0,
        excusedAbsenceCounter: 0,
        lateCounter: 0,
      };
    },
    props: {
        chartId: {
            type: String,
            default: 'doughnut-chart'
        },
        width: {
            type: Number,
            default: 400
        },
        height: {
            type: Number,
            default: 400
        },
        cssClasses: {
            default: '',
            type: String
        },
        styles: {
            type: Object,
            default: function () { }
        },
        plugins: {
            type: Array,
            default: function () { return []; }
        }
    },
    setup: function (props) {
        var chartData = {
            labels: ['Not Attended', 'Attended', 'Excused Attendance', 'Late'],
            datasets: [
                {
                    backgroundColor: ['#ff0000', '#2aff00', '#ecff00', '#ffb600'],
                    data: [this.notAttendedCounter, this.attendedCounter, this.excusedAbsenceCounter, this.totalValueCounter]
                }
            ]
        };
        var chartOptions = {
            responsive: true,
            maintainAspectRatio: false
        };
        return function () {
            return (0, vue.h)(vueChart.Doughnut, {
                chartData: chartData,
                chartOptions: chartOptions,
                chartId: props.chartId,
                width: props.width,
                height: props.height,
                cssClasses: props.cssClasses,
                styles: props.styles,
                plugins: props.plugins
            });
        };
    }
});
</script>