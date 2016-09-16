/**
 * Created by mystic_alex on 21/08/16.
 */

var cor = {}, predecessor = {}, tempo = 0, d = {}, f = {};
var network;
var grafoNetwork, grafo;

var networkNaoDirecionado, grafoNetworkNaoDirecionado;

var dfs = function (graph, verticeInicial) {
    cor = [];
    predecessor = [];
    d = [];
    f = [];

    var listaVertices = graph.getListaVertices();

    for (var u in listaVertices) {
        cor[u] = 'BRANCO';
        predecessor[u] = null;
    }

    tempo = 0;

    listaVertices = listaVertices.filter(function (element) {
        return element != verticeInicial
    });

    listaVertices.unshift(verticeInicial);

    for (var u in graph.getListaVertices()) {
        if (cor[listaVertices[u]] == 'BRANCO') {
            visitaDFS(listaVertices[u], graph);
        }
    }
};

var visitaDFS = function (u, graph) {
    cor[u] = 'CINZA';
    tempo++;
    d[u] = tempo;

    var adjacentes = graph.getVerticesAdjacentes(u);

    for (var i in adjacentes) {
        var v = adjacentes[i];

        if (cor[v] == 'BRANCO') {
            predecessor[v] = u;
            visitaDFS(v, graph);
        }
    }

    cor[u] = 'PRETO';
    tempo++;
    f[u] = tempo;
};

function atualizarTabelaDFS() {
    var tabelaBody = $('#tabelaDFS tbody');

    tabelaBody.empty();

    for (var i = 0; i < grafo.numVertices; i++) {
        var tr = document.createElement('tr');

        tr.appendChild(getTableCell(i));
        tr.appendChild(getTableCell(d[i]));
        tr.appendChild(getTableCell(f[i]));

        tabelaBody.append(tr);
    }
}

var getTableCell = function (content) {
    var cell = document.createElement('td');

    cell.appendChild(document.createTextNode(content));

    return cell;
};

function getCaminhoMaisCurto(origem, destino) {
    var retorno = $('#caminhoMaisCurtoResultado');

    var caminhoMaisCurto = grafo.caminhoMaisCurto(origem, destino);

    if (caminhoMaisCurto) {
        retorno.html("O caminho mais curto de " + origem + ' até ' + destino + ' é ' + caminhoMaisCurto.join(' -> '));
        retorno.removeClass('alert-danger');
        retorno.addClass('alert-success');
    } else {
        retorno.html("Não existe caminho de " + origem + ' até ' + destino + '.');
        retorno.removeClass('alert-success');
        retorno.addClass('alert-danger');
    }

    retorno.removeClass('hidden');
}

function atualizarOrdemDeVisitaDFS(ordemVisita, idMensagem) {
    var mensagem = $(idMensagem);
    mensagem.removeClass('hidden');
    mensagem.removeClass('alert-danger');
    mensagem.addClass('alert-success');

    mensagem.text('Ordem de visita: ' + ordemVisita.join(' --> '));
}

var imprimirMensagemErro = function (idMensagem, verticeInicial) {
    var mensagem = $(idMensagem);
    mensagem.removeClass('hidden');
    mensagem.removeClass('alert-success');
    mensagem.addClass('alert-danger');

    mensagem.text('O vértice ' + verticeInicial + ' não existe no grafo!');
};

function encontrarBuscaEmProfundidade(verticeInicial, grafo, idMensagem) {
    if (! grafo.existeVertice(verticeInicial)) {
        imprimirMensagemErro(idMensagem, verticeInicial);
        return;
    }

    dfs(grafo, verticeInicial);

    atualizarTabelaDFS();

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

var criarGrafoQuestao6 = function () {
    // create an array with nodes
    var nodes = new vis.DataSet([
            {id: 0, label: '0', x: 0, y: 0, physics: false},
            {id: 1, label: '1', x: 200, y: 0, physics: false},
            {id: 2, label: '2', x: 100, y: 0, physics: false},
            {id: 3, label: '3', x: 0, y: 100, physics: false},
            {id: 4, label: '4', x: 200, y: 100, physics: false},
            {id: 5, label: '5', x: 0, y: -100, physics: false},
            {id: 6, label: '6', x: 200, y: -100, physics: false},
            {id: 7, label: '7', x: -100, y: 100, physics: false},
            {id: 8, label: '8', x: 100, y: 100, physics: false},
            {id: 9, label: '9', x: -100, y: 0, physics: false}
        ]
    );

    // create an array with edges
    var edges = new vis.DataSet([
        {from: 0, to: 2, id: '0to2'},
        {from: 0, to: 3, id: '0to3'},
        {from: 1, to: 4, id: '1to4'},
        {from: 1, to: 8, id: '1to8'},
        {from: 2, to: 5, id: '2to5'},
        {from: 5, to: 6, id: '5to6'},
        {from: 6, to: 2, id: '6to2'},
        {from: 4, to: 8, id: '4to8'},
        {from: 3, to: 7, id: '3to7'},
        {from: 3, to: 8, id: '3to8'},
        {from: 8, to: 0, id: '8to0'},
        {from: 9, to: 7, id: '9to7'},
        {from: 7, to: 9, id: '7to9'}
    ]);

    return criarGrafo(nodes, edges, 'mynetwork', grafoNetwork, DIRECIONADO);
};

var criarGrafoNaoDirecionadoQuestao6 = function () {
    // create an array with nodes
    var nodes = new vis.DataSet([
            {id: 0, label: '0', x: 0, y: 0, physics: false},
            {id: 1, label: '1', x: 200, y: 0, physics: false},
            {id: 2, label: '2', x: 200, y: 150, physics: false},
            {id: 3, label: '3', x: 0, y: 150, physics: false},
        ]
    );

    // create an array with edges
    var edges = new vis.DataSet([
        {from: 0, to: 1, id: '0to1'},
        {from: 1, to: 2, id: '1to2'},
        {from: 2, to: 3, id: '2to3'},
        {from: 3, to: 0, id: '3to0'},

    ]);

    return criarGrafo(nodes, edges, 'grafoVisualNaoDirecionado', grafoNetworkNaoDirecionado, NAO_DIRECIONADO);
};

function getRepresentacaoGrafoNaoDirecionadoQuestao6(tipoGrafo) {

    var grafo = new tipoGrafo(4, NAO_DIRECIONADO);

    grafo.inserirAresta(0, 1);
    grafo.inserirAresta(1, 2);
    grafo.inserirAresta(2, 3);
    grafo.inserirAresta(3, 0);

    return grafo;
}

$(function () {
    grafo = getGrafoQuestao6_9(GrafoMatriz);

    encontrarBuscaEmProfundidade('0', grafo, '#ordemDeVisita');

    grafoNetwork = getGrafoQuestao6_9(GrafoListaAdjacencia);
    network = criarGrafoQuestao6();

    grafoNetworkNaoDirecionado = getRepresentacaoGrafoNaoDirecionadoQuestao6(GrafoListaAdjacencia);
    networkNaoDirecionado = criarGrafoNaoDirecionadoQuestao6();
});

