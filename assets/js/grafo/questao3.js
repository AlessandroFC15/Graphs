/**
 * Created by mystic_alex on 25/08/16.
 */

const ITERATIONS = 20;
const DIGITS = 6;

var atualizarTabelaPerformance = function() {
    var tabelaBody = $('#tabelaPerformance tbody');

    var html = '';

    for (var i = 0; i < grafoMatriz.matriz.length; i++) {
        html += getRowTabelaPerformance(i, grafoMatriz, grafoListaAdjacencia);
    }

    tabelaBody.html(html);
};

var getRowTabelaPerformance = function(i, grafoM, grafoL) {
    var html = ''

    html += '<td>' + i + '</td>' +
            '<td>' + grafoM.getVerticesAdjacentes(i).join(', ') + '</td>' + 
            '<td>' + getPerformanceTime(function () { grafoM.getVerticesAdjacentes(i); }, ITERATIONS).toFixed(DIGITS) + '</td>' + 
            '<td>' + getPerformanceTime(function () { grafoL.getVerticesAdjacentes(i); }, ITERATIONS).toFixed(DIGITS) + '</td>';

    return '<tr>' + html +'</tr>';
};

$(function () {
    atualizarTabelaPerformance();
});