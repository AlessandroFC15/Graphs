/**
 * Created by mystic_alex on 21/08/16.
 */

var cor = {}, predecessor = {}, tempo = 0, d = {}, f = {};
var network;
var grafoNetwork, grafo;

var networkNaoDirecionado, grafoNetworkNaoDirecionado;

var dfs = function (graph, verticeInicial, listaVertices) {
    cor = {};
    predecessor = {};
    d = {};
    f = {};

    if (listaVertices === undefined) {
        listaVertices = graph.getListaVertices();

        listaVertices = listaVertices.filter(function (element) {
            return element != verticeInicial
        });

        listaVertices.unshift(verticeInicial);
    }

    for (var u in listaVertices) {
        cor[listaVertices[u]] = 'BRANCO';
        predecessor[listaVertices[u]] = null;
    }

    tempo = 0;

    for (var u in listaVertices) {
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

function encontrarBuscaEmProfundidade(verticeInicial, grafo, ordemVisitaVertices) {
    dfs(grafo, verticeInicial, ordemVisitaVertices);
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

var encontrarSubGrafosBuscaEmProfundidade = function(verticeInicial, graph, listaVertices) {
    cor = {};
    predecessor = {};
    d = {};
    f = {};

    if (listaVertices === undefined) {
        listaVertices = graph.getListaVertices();

        listaVertices = listaVertices.filter(function (element) {
            return element != verticeInicial
        });

        listaVertices.unshift(verticeInicial);
    }

    for (var u in listaVertices) {
        cor[listaVertices[u]] = 'BRANCO';
        predecessor[listaVertices[u]] = null;
    }

    tempo = 0;

    var subGrafos = [];
    var subGrafoAtual = [];

    for (var u in listaVertices) {
        if (cor[listaVertices[u]] == 'BRANCO') {
            visitaDFS(listaVertices[u], graph);

            if (subGrafoAtual.length > 0) {
                subGrafos.push(subGrafoAtual);
            }

            subGrafoAtual = [listaVertices[u]];
        } else {
            subGrafoAtual.push(listaVertices[u]);
        }
    }

    if (subGrafoAtual !== []) 
        subGrafos.push(subGrafoAtual);

    return subGrafos;
}

var imprimirComponentesFortementeConexos = function(componentes, idMensagem) {
    var mensagem = $(idMensagem);

    mensagem.empty();

    if (componentes.length > 0) {
        var strong  = document.createElement('strong');
        
        for (var i = 0; i < componentes.length; i++) {
            var componente = document.createElement("p");
            componente.appendChild(document.createTextNode((i + 1) + 'º componente: ' + componentes[i].join(', ')));
            strong.appendChild(componente);
        }

        mensagem.append(strong);
    } else {
        mensagem.html('Não existem componentes fortemente conexos no grafo!');
    }

    mensagem.removeClass('hidden');
}

var getComponentesFortementeConexos = function(grafo, idMensagem) {
    // Aplicar a busca em profundidade no grafo G para obter os tempos de término para cada vértice u.
    encontrarBuscaEmProfundidade('0', grafo);

    var temposTermino = [];

    // Obter o grafo transposto GT
    var grafoTransposto = grafo.getGrafoTransposto();

    // Aplicar a busca em profundidade no grafo GT, realizando a
    // busca a partir do vértice de maior tempo obtido na linha 1. Se
    // a busca em profundidade não alcançar todos os vértices,
    // inicie uma nova busca em profundidade a partir do vértice de
    // maior tempo dentre os vértices restantes.

    var listaVertices = grafo.getListaVertices();

    for (var i in listaVertices) {
        temposTermino.push({indice: listaVertices[i], tempoTermino: f[listaVertices[i]]});
    }

    temposTermino.sort(function (a, b) {
        return b.tempoTermino - a.tempoTermino;
    });

    var ordemVisitaVertices = temposTermino.map(function (element) {
        return element.indice;
    });

    var subgrafos = encontrarSubGrafosBuscaEmProfundidade('0', grafoTransposto, ordemVisitaVertices);

    imprimirComponentesFortementeConexos(subgrafos, idMensagem);
}

$(function () {
    grafoNetwork = getGrafoQuestao6_9(GrafoListaAdjacencia);
    network = criarGrafoQuestao6();

    grafoNetworkNaoDirecionado = getRepresentacaoGrafoNaoDirecionadoQuestao6(GrafoListaAdjacencia);
    networkNaoDirecionado = criarGrafoNaoDirecionadoQuestao6();
});

