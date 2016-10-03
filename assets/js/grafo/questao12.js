var networkNaoDirecionado, grafoNetworkNaoDirecionado;

var criarGrafoNaoDirecionadoQuestao12 = function (id, representacao) {
    // create an array with nodes
    var nodes = new vis.DataSet([
            {id: 0, label: 's', x: -300, y: 100, physics: false},
            {id: 1, label: 'u', x: -150, y: 0, physics: false},
            {id: 2, label: 'v', x: 0, y: 0, physics: false},
            {id: 3, label: 'x', x: -150, y: 200, physics: false},
            {id: 4, label: 'y', x: 0, y: 200, physics: false},
            /*{id: 3, label: '3', x: 200, y: 0, physics: false},
            {id: 4, label: '4', x: -300, y: 200, physics: false},*/
            
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
        var weight = prompt('Insira o valor da aresta: ')
        edgeData.id = edgeData.from + 'to' + edgeData.to;
        edgeData.label = weight;
        callback(edgeData);
        representacao.inserirAresta(edgeData.from, edgeData.to, parseInt(edgeData.label));
        grafo.addEdgeMode();

    }

    return grafo;
};

var getRepresentacaoGrafoNaoDirecionadoQuestao12 = function (tipoGrafo) {
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

var conversao = {
    0: 's',
    1: 'u',
    2: 'v',
    3: 'x',
    4: 'y'
};

var caminhoMinimoDijkstra = function() {
    var dados = grafoNetworkNaoDirecionado.caminhoMinimoDijkstra(0);

    var mensagem = $("#mensagemNaoDirecionado");

    var html = '';

    for (var i in dados) {
        if (i !== '0') {
            html += '<p>De s até ' + conversao[i] + ': ' + dados[i].caminho.map(function(element){ return conversao[element]}).join(' --> ') + " | Peso: " + dados[i].distancia + '</p>';
        }
    }

    mensagem.html(html);
    mensagem.removeClass('hidden');
}

$(function () {
    grafoNetworkNaoDirecionado = getRepresentacaoGrafoNaoDirecionadoQuestao12(GrafoListaAdjacenciaComPeso);
    networkNaoDirecionado = criarGrafoNaoDirecionadoQuestao12('grafoVisualNaoDirecionado', grafoNetworkNaoDirecionado);
});