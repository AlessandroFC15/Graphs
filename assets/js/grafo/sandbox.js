var network;

$(function(){
	// network = criarGrafo();
});

var locales = {
    en: {
        edit: 'Editar',
        del: 'Remover selecionado',
        back: 'Voltar',
        addNode: 'Adicionar Vértice',
        addEdge: 'Adicionar Aresta',
        editNode: 'Editar Vértice',
        editEdge: 'Editar Aresta',
        addDescription: 'Clique em um espaço vago para criar um novo vértice.',
        edgeDescription: 'Click on a node and drag the edge to another node to connect them.',
        editEdgeDescription: 'Click on the control points and drag them to a node to connect to it.',
        createEdgeError: 'Cannot link edges to a cluster.',
        deleteClusterError: 'Clusters cannot be deleted.',
        editClusterError: 'Clusters cannot be edited.'
    }
};

var options = {
    locales: locales,
    physics:{
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
        addNode: function(nodeData,callback) {
            nodeData.id = grafoListaAdjacencia.numVertices;
            nodeData.label = grafoListaAdjacencia.numVertices;
            grafoListaAdjacencia.inserirVertice();
            callback(nodeData);
        },
        addEdge: true,
        editNode: function(data, callback) { console.log("Quer editar??")},
        editEdge: true,
        deleteNode: function(data, callback) {
            grafoListaAdjacencia.removerVertice(data.nodes[0]);
            callback(data);
        },
        deleteEdge: true,
        controlNodeStyle:{
            // all node options are valid.
        }
    },
    edges: {
        arrows: 'to'
    }
};



