/**
 * Created by mystic_alex on 21/08/16.
 */

var network;
var grafoNetwork, grafo;

var networkNaoDirecionado, grafoNetworkNaoDirecionado;

var getTableCell = function (content) {
    var cell = document.createElement('td');

    cell.appendChild(document.createTextNode(content));

    return cell;
};

var imprimirMensagemErro = function (idMensagem, verticeInicial, idButtonTabela) {
    var mensagem = $(idMensagem);
    mensagem.removeClass('hidden');
    mensagem.removeClass('alert-success');
    mensagem.addClass('alert-danger');

    mensagem.text('O vértice ' + verticeInicial + ' não existe no grafo!');

    if (idButtonTabela !== undefined) {
        $(idButtonTabela).addClass('hidden');
    }
};

function encontrarBuscaEmProfundidade(verticeInicial, grafo, idMensagem, idTabela, idButtonTabela) {
    if (! grafo.existeVertice(verticeInicial)) {
        imprimirMensagemErro(idMensagem, verticeInicial, idButtonTabela);
        return;
    }

    dfs(grafo, verticeInicial);

    atualizarTabelaDFS(d, f, grafo, idTabela, idButtonTabela);

    var inicioTempoVertices = [];

    var listaVertices = grafo.getListaVertices();

    for (var i in listaVertices) {
        inicioTempoVertices.push({indice: listaVertices[i], inicio: d[listaVertices[i]]});
    }

    inicioTempoVertices.sort(function (a, b) {
        return a.inicio - b.inicio;
    });

    ordemVisita = inicioTempoVertices.map(function (element) {
        return element.indice;
    });

    atualizarOrdemDeVisitaDFS(ordemVisita, idMensagem);
}

$(function () {
    grafo = getGrafoQuestao6_9(GrafoMatriz);

    encontrarBuscaEmProfundidade('0', grafo, '#ordemDeVisita', '#tabelaDFS');
});

