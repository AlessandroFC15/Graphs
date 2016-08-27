$(function(){
	// create an array with nodes
    var nodes = new vis.DataSet([
    	{id: 0, label: '0', x: -250, y: -250, physics: false},
    	{id: 1, label: '1', x: 0, y: -250, physics: false},
    	{id: 2, label: '2', x: 0, y: 0, physics: false},
    	{id: 3, label: '3', x: -250, y: 0, physics: false},
    	{id: 4, label: '4', x: -175, y: -175, physics: false},
    	{id: 5, label: '5', x: -75, y: -175, physics: false},
    	{id: 6, label: '6', x: -175, y: -75, physics: false},
    	{id: 7, label: '7', x: -75, y: -75, physics: false}
	]
	);

    // create an array with edges
    var edges = new vis.DataSet([
        {from: 0, to: 1},
        {from: 0, to: 3},
        {from: 0, to: 4},
        {from: 1, to: 2},
        {from: 1, to: 5},
        {from: 2, to: 7},
        {from: 2, to: 3},
        {from: 3, to: 6},
        {from: 4, to: 5},
        {from: 4, to: 6},
        {from: 5, to: 7},
        {from: 7, to: 6}
    ]);

    // create a network
    var container = document.getElementById('mynetwork');

    // provide the data in the vis format
    var data = {
        nodes: nodes,
        edges: edges
    };

    var locales = {
	  en: {
	    edit: 'Editar',
	    del: 'Delete selected',
	    back: 'Back',
	    addNode: 'Add Node',
	    addEdge: 'Add Edge',
	    editNode: 'Edit Node',
	    editEdge: 'Edit Edge',
	    addDescription: 'Click in an empty space to place a new node.',
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
           stabilization: true,
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
		    addNode: true,
		    addEdge: true,
		    editNode: function(data, callback) { console.log("Quer editar??")},
		    editEdge: true,
		    deleteNode: true,
		    deleteEdge: true,
		    controlNodeStyle:{
		      // all node options are valid.
		    }
  		},
  		

    };

    // initialize your network!
    var network = new vis.Network(container, data, options);
});

var getVerticesFormatados = function(grafoM) {
	var vertices = []

	for (var i = 0; i < grafoM.matriz.length; i++) {
		vertices.push({id: i, label: i.toString()});
	}

	return vertices;
}