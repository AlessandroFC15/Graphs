var network;

$(function(){
	// network = criarGrafo();
});



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



