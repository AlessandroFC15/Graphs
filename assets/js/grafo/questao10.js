var networkNaoDirecionado, grafoNetworkNaoDirecionado;

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
};

var isEleurian = function (grafo, idMensagem) {
    var mensagem = $(idMensagem);

    if (grafo.isEleuriano()) {
        mensagem.html('O grafo inserido é euleriano.');
        mensagem.removeClass('alert-danger').addClass('alert-success');
    } else {
        mensagem.html('O grafo inserido NÃO é euleriano.');
        mensagem.removeClass('alert-success').addClass('alert-danger');
    }

    mensagem.removeClass('hidden');

};

$(function () {
    grafoNetworkNaoDirecionado = getRepresentacaoGrafoNaoDirecionadoQuestao6(GrafoListaAdjacencia);
    networkNaoDirecionado = criarGrafoNaoDirecionadoQuestao6('grafoVisualNaoDirecionado', grafoNetworkNaoDirecionado);
});