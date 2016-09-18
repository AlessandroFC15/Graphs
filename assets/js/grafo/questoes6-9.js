var network, grafoNetwork;
var networkNaoDirecionado, grafoNetworkNaoDirecionado;

var criarGrafoDirecionadoQuestao6 = function (id, representacao) {
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

    return criarGrafo(nodes, edges, id, representacao, DIRECIONADO);
};

var criarGrafoNaoDirecionadoQuestao6 = function (id, representacao) {
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

    return criarGrafo(nodes, edges, id, representacao, NAO_DIRECIONADO);
};

var getRepresentacaoGrafoNaoDirecionadoQuestao6 = function (tipoGrafo) {
    var grafo = new tipoGrafo(4, NAO_DIRECIONADO);

    grafo.inserirAresta(0, 1);
    grafo.inserirAresta(1, 2);
    grafo.inserirAresta(2, 3);
    grafo.inserirAresta(3, 0);

    return grafo;
}

var getGrafoQuestao6_9 = function (tipoGrafo) {
    var grafo = new tipoGrafo(10, DIRECIONADO);

    grafo.inserirAresta(9, 7);
    grafo.inserirAresta(7, 9);
    grafo.inserirAresta(3, 7);
    grafo.inserirAresta(0, 2);
    grafo.inserirAresta(0, 3);
    grafo.inserirAresta(8, 0);
    grafo.inserirAresta(3, 8);
    grafo.inserirAresta(4, 8);
    grafo.inserirAresta(1, 8);
    grafo.inserirAresta(1, 4);
    grafo.inserirAresta(2, 5);
    grafo.inserirAresta(5, 6);
    grafo.inserirAresta(6, 2);

    return grafo;
}

$(function () {
    grafoNetwork = getGrafoQuestao6_9(GrafoListaAdjacencia);
    network = criarGrafoDirecionadoQuestao6('mynetwork', grafoNetwork);

    grafoNetworkNaoDirecionado = getRepresentacaoGrafoNaoDirecionadoQuestao6(GrafoListaAdjacencia);
    networkNaoDirecionado = criarGrafoNaoDirecionadoQuestao6('grafoVisualNaoDirecionado', grafoNetworkNaoDirecionado);
});