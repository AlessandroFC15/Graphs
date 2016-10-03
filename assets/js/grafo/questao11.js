var networkNaoDirecionado, grafoNetworkNaoDirecionado;

var criarGrafoNaoDirecionadoQuestao10 = function (id, representacao) {
    // create an array with nodes
    var nodes = new vis.DataSet([
            {id: 1, label: '1', x: -200, y: 0, physics: false},
            {id: 2, label: '2', x: 0, y: 0, physics: false},
            {id: 3, label: '3', x: 200, y: 0, physics: false},
            {id: 4, label: '4', x: -300, y: 200, physics: false},
            {id: 5, label: '5', x: -100, y: 200, physics: false},
            {id: 6, label: '6', x: 100, y: 200, physics: false},
            {id: 7, label: '7', x: 300, y: 200, physics: false},
        ]
    );

    // create an array with edges
    var edges = new vis.DataSet([
        {from: 1, to: 4, id: '1to4'},
        {from: 1, to: 5, id: '1to5'},
        {from: 4, to: 5, id: '4to5'},
        {from: 2, to: 5, id: '2to5'},
        {from: 2, to: 6, id: '2to6'},
        {from: 5, to: 6, id: '5to6'},
        {from: 3, to: 6, id: '3to6'},
        {from: 3, to: 7, id: '3to7'},
        {from: 6, to: 7, id: '6to7'}
    ]);

    return criarGrafo(nodes, edges, id, representacao, NAO_DIRECIONADO);
};

var getRepresentacaoGrafoNaoDirecionadoQuestao10 = function (tipoGrafo) {
    var grafo = new tipoGrafo(8, NAO_DIRECIONADO);

    grafo.removerVertice(0);

    grafo.inserirAresta(1, 4);
    grafo.inserirAresta(1, 5);
    grafo.inserirAresta(4, 5);
    grafo.inserirAresta(2, 5);
    grafo.inserirAresta(2, 6);
    grafo.inserirAresta(5, 6);
    grafo.inserirAresta(3, 6);
    grafo.inserirAresta(3, 7);
    grafo.inserirAresta(6, 7);

    return grafo;
};

var encontrarPontosDeArticulacao = function (grafo, idMensagem) {
    var mensagem = $(idMensagem);

    var pontosDeArticulacao = grafo.encontrarArticulacoes();

    if (pontosDeArticulacao.length > 0) {
        mensagem.removeClass('alert-danger').addClass('alert-success');
        mensagem.html('Pontos de Articulação: ' + pontosDeArticulacao.join(', '));
        networkNaoDirecionado.selectNodes(pontosDeArticulacao, [false]);
    } else {
        mensagem.html('Não existem pontos de articulação no grafo acima.');
        mensagem.removeClass('alert-success').addClass('alert-danger');
    }

    mensagem.removeClass('hidden');

};

$(function () {
    grafoNetworkNaoDirecionado = getRepresentacaoGrafoNaoDirecionadoQuestao10(GrafoListaAdjacenciaComPeso);
    networkNaoDirecionado = criarGrafoNaoDirecionadoQuestao10('grafoVisualNaoDirecionado', grafoNetworkNaoDirecionado);
});