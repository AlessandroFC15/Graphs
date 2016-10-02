var networkNaoDirecionado, grafoNetworkNaoDirecionado;

var criarGrafoNaoDirecionadoQuestao14 = function (id, representacao) {

    var posicaoXdeB = 0;
    var posicaoYdeB = -25;

    // create an array with nodes
    var nodes = new vis.DataSet([
            {id: 0, label: 'A', x: posicaoXdeB - 150, y: posicaoYdeB - 75, physics: false},
            {id: 1, label: 'B', x: posicaoXdeB, y: posicaoYdeB, physics: false},
            {id: 2, label: 'C', x: posicaoXdeB + 150, y: posicaoYdeB - 75, physics: false},
            {id: 3, label: 'D', x: posicaoXdeB - 150, y: posicaoYdeB + 75, physics: false},
            {id: 4, label: 'E', x: posicaoXdeB + 150, y: posicaoYdeB + 75, physics: false},
            {id: 5, label: 'F', x: posicaoXdeB, y: posicaoYdeB + 125, physics: false},
            {id: 6, label: 'G', x: posicaoXdeB + 150, y: posicaoYdeB + 175, physics: false},
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

var desenharArvore = function(arvore, network) {
    var edges = []

    var arestas = arvore.getArestas();

    for (var i in arestas) {
        var u, v;
        [u, v] = arestas[i];

        edges.push([u + 'to' + v]);
    }

    console.log(edges);

    var validEdges = []

    for (var i = 0; i < edges.length; i++) {
        try {
            network.selectEdges(edges[i]);
            validEdges.push(edges[i][0]);
        } catch (e) {
            continue;
        }
    }

    network.selectEdges(validEdges);

}

var encontrarAGMPrim = function(grafo) {
    var arvore = grafo.encontrarAGMPrim(0);

    desenharArvore(arvore, networkNaoDirecionado);
};

$(function () {
    grafoNetworkNaoDirecionado = getRepresentacaoGrafoNaoDirecionadoQuestao14(GrafoListaAdjacenciaComPeso);
    networkNaoDirecionado = criarGrafoNaoDirecionadoQuestao14('grafoVisualNaoDirecionado', grafoNetworkNaoDirecionado);
});