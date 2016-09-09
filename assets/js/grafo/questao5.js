const ITERATIONS = 100;
const DIGITS = 6;

var atualizarTabelaPerformance = function() {
    var tabelaBody = $('#tabelaPerformance tbody');

    tabelaBody.empty();

    for (var i = 0; i < grafoMatriz.matriz.length; i++) {
        tabelaBody.append(getRowTabelaPerformance(i, grafoMatrizCompleto, grafoListaAdjacenciaCompleto));
    }
};

var getRowTabelaPerformance = function(vertice, grafoM, grafoL) {
    var tr = document.createElement('tr');

    tr.appendChild(getTableCell(vertice));
    tr.appendChild(getTableCell(grafoM.getVerticesAdjacentes(vertice).join(', ')));

    var performanceMatriz = getPerformanceTime(function () { grafoM.getVerticesAdjacentes(vertice); }, ITERATIONS);
    var performanceLista = getPerformanceTime(function () { grafoL.getVerticesAdjacentes(vertice); }, ITERATIONS);

    var cellPerformanceMatriz = getTableCell(performanceMatriz.toFixed(DIGITS));
    var cellPerformanceLista = getTableCell(performanceLista.toFixed(DIGITS));

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

$(function () {
    atualizarTabelaPerformance();
});