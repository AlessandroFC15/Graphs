var network, grafoNetwork;
var networkNaoDirecionado, grafoNetworkNaoDirecionado;

var criarGrafoDirecionadoQuestao12 = function (id, representacao) {
    // create an array with nodes
    var nodes = new vis.DataSet([
            {id: 0, label: '0', x: -300, y: 100, physics: false},
            {id: 1, label: '1', x: -150, y: 0, physics: false},
            {id: 2, label: '2', x: 0, y: 0, physics: false},
            {id: 3, label: '3', x: -150, y: 200, physics: false},
            {id: 4, label: '4', x: 0, y: 200, physics: false},
        ]
    );

    // create an array with edges
    var edges = new vis.DataSet([
        {from: 0, to: 1, id: '0to1', label: '10'},
        {from: 0, to: 3, id: '0to3', label: '5'},
        {from: 1, to: 2, id: '1to2', label: '1'},
        {from: 1, to: 3, id: '1to3', label: '2'},
        {from: 3, to: 1, id: '3to1', label: '3'},
        {from: 3, to: 2, id: '3to2', label: '9'},
        {from: 3, to: 4, id: '3to4', label: '2'},
        {from: 2, to: 4, id: '2to4', label: '4'},
        {from: 4, to: 2, id: '4to2', label: '6'},
        {from: 4, to: 0, id: '4to0', label: '7'},
    ]);

    var grafo = criarGrafo(nodes, edges, id, representacao, DIRECIONADO);

    grafo.manipulation.options.addEdge = function (edgeData, callback) {
        var weight = prompt('Insira o valor da aresta: ');
        edgeData.id = edgeData.from + 'to' + edgeData.to;
        edgeData.label = weight;
        callback(edgeData);
        representacao.inserirAresta(edgeData.from, edgeData.to, parseInt(edgeData.label));
        grafo.addEdgeMode();
    };

    return grafo;
};

var getRepresentacaoGrafoDirecionadoQuestao12 = function (tipoGrafo) {
    var grafo = new tipoGrafo(5, DIRECIONADO);

    // grafo.removerVertice(0);

    grafo.inserirAresta(0, 1, 10);
    grafo.inserirAresta(0, 3, 5);
    grafo.inserirAresta(1, 2, 1);
    grafo.inserirAresta(1, 3, 2);
    grafo.inserirAresta(3, 1, 3);
    grafo.inserirAresta(3, 2, 9);
    grafo.inserirAresta(3, 4, 2);
    grafo.inserirAresta(2, 4, 4);
    grafo.inserirAresta(4, 2, 6);
    grafo.inserirAresta(4, 0, 7);


    return grafo;
};

var criarGrafoNaoDirecionadoQuestao14 = function (id, representacao) {

    var posicaoXdeB = 0;
    var posicaoYdeB = -25;

    // create an array with nodes
    var nodes = new vis.DataSet([
            {id: 0, label: '0', x: posicaoXdeB - 150, y: posicaoYdeB - 75, physics: false},
            {id: 1, label: '1', x: posicaoXdeB, y: posicaoYdeB, physics: false},
            {id: 2, label: '2', x: posicaoXdeB + 150, y: posicaoYdeB - 75, physics: false},
            {id: 3, label: '3', x: posicaoXdeB - 150, y: posicaoYdeB + 75, physics: false},
            {id: 4, label: '4', x: posicaoXdeB + 150, y: posicaoYdeB + 75, physics: false},
            {id: 5, label: '5', x: posicaoXdeB, y: posicaoYdeB + 125, physics: false},
            {id: 6, label: '6', x: posicaoXdeB + 150, y: posicaoYdeB + 175, physics: false},
        ]
    );

    // create an array with edges
    var edges = new vis.DataSet([
        {from: 0, to: 1, id: '0to1', label: '7'},
        {from: 0, to: 3, id: '0to3', label: '5'},
        {from: 1, to: 2, id: '1to2', label: '8'},
        {from: 1, to: 3, id: '1to3', label: '9'},
        {from: 1, to: 4, id: '1to4', label: '7'},
        {from: 2, to: 4, id: '2to4', label: '5'},
        {from: 3, to: 4, id: '3to4', label: '15'},
        {from: 3, to: 5, id: '3to5', label: '6'},
        {from: 4, to: 5, id: '4to5', label: '8'},
        {from: 4, to: 6, id: '4to6', label: '9'},
        {from: 5, to: 6, id: '5to6', label: '11'},
    ]);

    var grafo = criarGrafo(nodes, edges, id, representacao, NAO_DIRECIONADO);

    grafo.manipulation.options.addEdge = function (edgeData, callback) {
        var weight = prompt('Insira o valor da aresta: ')
        edgeData.id = edgeData.from + 'to' + edgeData.to;
        edgeData.label = weight;
        callback(edgeData);
        representacao.inserirAresta(edgeData.from, edgeData.to, parseInt(edgeData.label));
        grafo.addEdgeMode();

    }

    return grafo;
};

var getRepresentacaoGrafoNaoDirecionadoQuestao14 = function (tipoGrafo) {
    var grafo = new tipoGrafo(7, NAO_DIRECIONADO);

    // grafo.removerVertice(0);

    grafo.inserirAresta(0, 1, 7);
    grafo.inserirAresta(0, 3, 5);
    grafo.inserirAresta(1, 2, 8);
    grafo.inserirAresta(1, 3, 9);
    grafo.inserirAresta(1, 4, 7);
    grafo.inserirAresta(2, 4, 5);
    grafo.inserirAresta(3, 4, 15);
    grafo.inserirAresta(3, 5, 6);
    grafo.inserirAresta(4, 5, 8);
    grafo.inserirAresta(4, 6, 9);
    grafo.inserirAresta(5, 6, 11);

    return grafo;
};

/*Dijkstra*/

var caminhoMinimoDijkstra = function(grafo, idMensagem) {
    var dados = grafo.caminhoMinimoDijkstra(0);
    var mensagem = $(idMensagem);

    var html = '';

    for (var i in dados) {
        if (i !== '0') {
            html += '<p>De 0 até ' + i + ': ' + dados[i].caminho.join(' --> ') + " | Peso: " + dados[i].distancia + '</p>';
        }
    }

    mensagem.html(html);
    mensagem.removeClass('hidden');
};

/*Bellman-Ford*/

var caminhoMinimoBF = function(grafo, idMensagem) {
    var dados = grafo.caminhoMinimoBF(0);
    var mensagem = $(idMensagem);

    var html = '';

    for (var i in dados) {
        if (i !== '0') {
            html += '<p>De 0 até ' + i + ': ' + dados[i].caminho.join(' --> ') + " | Peso: " + dados[i].distancia + '</p>';
        }
    }

    mensagem.html(html);
    mensagem.removeClass('hidden');
};

/* PRIM */

var encontrarAGMPrim = function(grafo, network) {
    var arvore = grafo.encontrarAGMPrim(0);

    desenharArvore(arvore, network);
};

var desenharArvore = function(arvore, network) {
    var edges = [];

    var arestas = arvore.getArestas();

    for (var i in arestas) {
        var u, v;
        u = arestas[i][0];
        v = arestas[i][1];

        edges.push([u + 'to' + v]);
    }

    console.log(edges);

    var validEdges = [];

    for (var i = 0; i < edges.length; i++) {
        try {
            network.selectEdges(edges[i]);
            validEdges.push(edges[i][0]);
        } catch (e) {
            continue;
        }
    }

    network.selectEdges(validEdges);

};

$(function () {
    grafoNetwork = getRepresentacaoGrafoDirecionadoQuestao12(GrafoListaAdjacenciaComPeso);
    network = criarGrafoDirecionadoQuestao12('mynetwork', grafoNetworkNaoDirecionado);

    grafoNetworkNaoDirecionado = getRepresentacaoGrafoNaoDirecionadoQuestao14(GrafoListaAdjacenciaComPeso);
    networkNaoDirecionado = criarGrafoNaoDirecionadoQuestao14('grafoVisualNaoDirecionado', grafoNetworkNaoDirecionado);
});