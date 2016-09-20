/**
 * Created by acception on 9/16/16.
 */

var criarGrafo = function (nodes, edges, id, grafoRepresentacao, tipoGrafo) {
    // create a network
    var container = document.getElementById(id);

    // provide the data in the vis format
    var data = {
        nodes: nodes,
        edges: edges
    };

    var edgesOptions = {};

    if (tipoGrafo == DIRECIONADO) {
        edgesOptions = { arrows: 'to' }
    }

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
            deleteNode: function (data, callback) {
                grafoRepresentacao.removerVertice(data.nodes[0]);
                callback(data);
            },
            deleteEdge: function (edgeData, callback) {
                var verticesEnvolvidos = edgeData.edges[0].split('to');

                grafoRepresentacao.removerAresta(verticesEnvolvidos[0], verticesEnvolvidos[1]);

                callback(edgeData);

            },
            controlNodeStyle: {
                // all node options are valid.
            }
        },
        edges: edgesOptions
    };

    var network = new vis.Network(container, data, options);

    network.manipulation.options.addNode = function (nodeData, callback) {
        var vertice = grafoRepresentacao.numVertices;

        for (var i = 0; i < 50; i++) {
            if (!(i in grafoRepresentacao.lista)) {
                vertice = i;
                break;
            }
        }

        nodeData.id = vertice;
        nodeData.label = vertice;
        grafoRepresentacao.inserirVertice(vertice);
        callback(nodeData);
        network.addNodeMode();
    }

    network.manipulation.options.addEdge = function (edgeData, callback) {
        
        edgeData.id = edgeData.from + 'to' + edgeData.to;
        callback(edgeData);
        grafoRepresentacao.inserirAresta(edgeData.from, edgeData.to);
        network.addEdgeMode();

    }
    
    // initialize your network!
    return network;
};

var resetGraph = function (grafoVisual, grafoRepresentacao) {
    grafoVisual.setData({
        nodes: new vis.DataSet([
                {id: 0, label: '0', x: 50, y: 0, physics: false}
            ]
        ),
        edges: new vis.DataSet([])
    });

    grafoRepresentacao.resetarGrafo(1);
};