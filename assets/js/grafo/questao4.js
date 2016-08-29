/**
 * Created by mystic_alex on 25/08/16.
 */

const ITERATIONS = 200;
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
                backgroundColor: "#757575",
                borderColor: "#757575",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "#C51162",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "#C51162",
                pointHoverBorderColor: "#C51162",
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
                backgroundColor: "#B2DFDB",
                borderColor: "#B2DFDB",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "#B2DFDB",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "#B2DFDB",
                pointHoverBorderColor: "#B2DFDB",
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
};

var atualizarTabelaPerformance = function(dados) {
    var tabelaBody = $('#tabelaPerformance tbody');

    tabelaBody.empty();

    for (var i in dados.labels) {
        tabelaBody.append(getRowTabelaPerformance(i, dados.performanceMatriz[i], dados.performanceLista[i]));
    }
};

var getRowTabelaPerformance = function(vertice, performanceMatriz, performanceLista) {
    var tr = document.createElement('tr');

    tr.appendChild(getTableCell(vertice));

    var cellPerformanceMatriz = getTableCell(performanceMatriz);
    var cellPerformanceLista = getTableCell(performanceLista);

    if (performanceMatriz > performanceLista) {
        cellPerformanceMatriz.className = 'danger';
        cellPerformanceLista.className = 'success';
    } else if (performanceMatriz < performanceLista){
        cellPerformanceMatriz.className = 'success';
        cellPerformanceLista.className = 'danger';
    } else {
        cellPerformanceMatriz.className = 'info';
        cellPerformanceLista.className = 'info';
    }

    tr.appendChild(cellPerformanceMatriz);
    tr.appendChild(cellPerformanceLista);

    return tr;
};

var getTableCell = function (content) {
    var cell = document.createElement('td');

    cell.appendChild(document.createTextNode(content));

    return cell;

};

$(function() {
    var dadosGrafico = getGraphicData();

    atualizarGrafico(dadosGrafico);

    atualizarTabelaPerformance(dadosGrafico);
});