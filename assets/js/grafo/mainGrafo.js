/**
 * Created by mystic_alex on 20/08/16.
 */

function atualizarTabelaGrafoMatriz(grafoMatriz, idTabelaMatriz) {
    atualizarCabecalho(grafoMatriz, idTabelaMatriz);

    atualizarDados(grafoMatriz, idTabelaMatriz);
}

function atualizarCabecalho(grafoMatriz, idTabelaMatriz) {
    var cabecalho = $(idTabelaMatriz + ' thead tr');

    var html = '<th class="text-center">#</th>';

    for (var i = 0; i < grafoMatriz.matriz.length; i++) {
        html += '<th class="text-center">' + i + '</th>';
    }

    cabecalho.html(html);
}

function atualizarDados(grafoMatriz, idTabelaMatriz) {
    var body = $('tbody', idTabelaMatriz);

    var html = '';

    for (var i = 0; i < grafoMatriz.matriz.length; i++) {
        html += getRowDados(i, grafoMatriz.matriz[i]);
    }

    body.html(html);
}

function getRowDados(i, array) {
    var tableData = '<td><strong>' + i  +'</strong></td>';

    for (var i = 0; i < array.length; i++)
        tableData +=  '<td>' + array[i]  +'</td>';

    return '<tr>' + tableData + '</tr>';
}

function changeButtonText(element, initialValue, changeTo) {
    if (element.html().indexOf(initialValue) != -1) {
        element.html(changeTo);
    } else {
        element.html(initialValue);
    }
}
