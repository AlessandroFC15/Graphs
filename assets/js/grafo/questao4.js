/**
 * Created by mystic_alex on 25/08/16.
 */

const ITERATIONS = 100;
const DIGITS = 6;

var getGraphicData = function() {
    var data = {};
    var labels = [];
    var performanceMatriz = [], performanceLista = [];

    for (var i = 0; i < grafoMatriz.matriz.length; i++) {
        labels.push(i);
        performanceMatriz.push(getPerformanceTime(function () { grafoMatriz.getVerticesAdjacentes(i); }, ITERATIONS).toFixed(DIGITS));
        performanceLista.push(getPerformanceTime(function () { grafoListaAdjacencia.getVerticesAdjacentes(i); }, ITERATIONS).toFixed(DIGITS));

        data[i] = {
            performanceMatriz: getPerformanceTime(function () { grafoMatriz.getVerticesAdjacentes(i); }, ITERATIONS).toFixed(DIGITS),
            performanceLista: getPerformanceTime(function () { grafoListaAdjacencia.getVerticesAdjacentes(i); }, ITERATIONS).toFixed(DIGITS)
        };
    }

    return {
        labels: labels,
        performanceMatriz: performanceMatriz,
        performanceLista: performanceLista
    };
};

var atualizarGrafico = function(dados) {
    var ctx = $("#myChart");

    var data = {
        labels: dados.labels,
        datasets: [
            {
                label: "Performance Matriz",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: dados.performanceMatriz,
                spanGaps: false,
            },
            {
                label: "Performance Lista",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(192,75,75,0.4)",
                borderColor: "rgba(192,75,75,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(192,75,75,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(192,75,75,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: dados.performanceLista,
                spanGaps: false,
            }
        ]
    };
    
    var myLineChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            scales: {
                xAxes: [{
                  scaleLabel: {
                    display: true,
                    labelString: 'Vértice'
                  }
                }],
                yAxes: [{
                  scaleLabel: {
                    display: true,
                    labelString: 'Performance (s)'
                  }
                }]
              }
        }
    });
}

$(function() {
    var dadosGrafico = getGraphicData();

    atualizarGrafico(dadosGrafico);
});