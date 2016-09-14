/**
 * Created by mystic_alex on 21/08/16.
 */

var cor = {}, predecessor = {}, tempo = 0, d = {}, f = {};
var network;
var grafoNetwork, grafo;

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

    mensagem.find('span').text(ordemVisita.join(' --> '));
}

function encontrarBuscaEmProfundidade(verticeInicial, grafo, idMensagem) {
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

var criarGrafo = function () {
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

    // create a network
    var container = document.getElementById('mynetwork');

    // provide the data in the vis format
    var data = {
        nodes: nodes,
        edges: edges
    };

    var options = {
        locales: locales,
        physics: {
            stabilization: true
        },
        nodes: {
            physics: false,
            color: {
                border: '#000000',
                background: '#FFFFFF',
                highlight: {
                    border: '#2B7CE9',
                    background: '#D2E5FF'
                },
                hover: {
                    border: '#FFFFFF',
                    background: '#D2E5FF'
                }
            }
        },
        manipulation: {
            enabled: true,
            initiallyActive: true,
            addNode: function (nodeData, callback) {
                var vertice = grafoNetwork.numVertices;

                for (var i = 0; i < 50; i++) {
                    if (!(i in grafoNetwork.lista)) {
                        vertice = i;
                        break;
                    }
                }

                nodeData.id = vertice;
                nodeData.label = vertice;
                grafoNetwork.inserirVertice(vertice);
                callback(nodeData);
            },
            addEdge: function (edgeData, callback) {
                edgeData.id = edgeData.from + 'to' + edgeData.to;
                grafoNetwork.inserirAresta(edgeData.from, edgeData.to);
                callback(edgeData);
            },
            editNode: function (data, callback) {
                console.log("Quer editar??")
            },
            editEdge: true,
            deleteNode: function (data, callback) {
                grafoNetwork.removerVertice(data.nodes[0]);
                callback(data);
            },
            deleteEdge: function (edgeData, callback) {
                var verticesEnvolvidos = edgeData.edges[0].split('to');

                grafoNetwork.removerAresta(verticesEnvolvidos[0], verticesEnvolvidos[1]);

                callback(edgeData);

            },
            controlNodeStyle: {
                // all node options are valid.
            }
        },
        edges: {
            arrows: 'to'
        }
    };

    // initialize your network!
    return new vis.Network(container, data, options);
};

$(function () {
    grafo = getGrafoQuestao6_9(GrafoMatriz);

    encontrarBuscaEmProfundidade(0, grafo, '#ordemDeVisita');

    network = criarGrafo();

    grafoNetwork = getGrafoQuestao6_9(GrafoListaAdjacencia);
});

