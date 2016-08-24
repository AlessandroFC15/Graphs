function GrafoListaAdjacencia(numVertices, tipoGrafo) {
    this.tipoGrafo = tipoGrafo;
    this.lista = initializarLista(numVertices);
    this.numVertices = numVertices;
}

GrafoListaAdjacencia.prototype.inserirAresta = function(verticeSaida, verticeChegada) {
    if (this.lista[verticeSaida] && this.lista[verticeChegada]) {
        this.lista[verticeSaida].push(verticeChegada);

        if (this.tipoGrafo == NAO_DIRECIONADO) {
            this.lista[verticeChegada].push(verticeSaida);
        }
    } else {
        console.log("# Insira vértices válidos. #");
    }
};

GrafoListaAdjacencia.prototype.existeAresta = function(verticeSaida, verticeChegada) {
    return this.lista[verticeSaida] && this.lista[verticeSaida].indexOf(Number(verticeChegada)) != -1;
};

GrafoListaAdjacencia.prototype.printListaAdjacencia = function(idListaAdjacencia) {
    var body = $('tbody', idListaAdjacencia);

    var html = '';

    for (var i in this.lista) {
        if (this.lista.hasOwnProperty(i)) {
            html += getTableRowListaAdjacencia(i, this.lista[i]);
        }
    }

    body.html(html);
};

GrafoListaAdjacencia.prototype.atualizarSelect = function(idSelect) {
    var options = "";

    for (var i in this.lista) {
        options += '<option>' + i +'</option>';
    }

    $(idSelect).html(options);
};

GrafoListaAdjacencia.prototype.getGrafoCompleto = function () {
    var grafoCompleto = new GrafoListaAdjacencia(this.numVertices, this.tipoGrafo);
    
    for (var i = 0; i < this.numVertices; i++) {
        var adjacentes = [];
        
        for (var j = 0; j < this.numVertices; j++) {
            if (j != i)
                adjacentes.push(j);
        }
        
        grafoCompleto.lista[i] = adjacentes;
    }
    
    return grafoCompleto;
};

GrafoListaAdjacencia.prototype.getVerticesAdjacentes = function (vertice) {
    if (this.lista[vertice]) {
        return this.lista[vertice];
    }
};

function getTableRowListaAdjacencia(vertice, adjacentes) {
    var tableData = '<td><strong>' + vertice  +' ----> </strong></td>';

    for (var i = 0; i < adjacentes.length; i++)
        tableData +=  '<td>' + adjacentes[i]  +'</td>';

    return '<tr>' + tableData + '</tr>';
}

function initializarLista(numVertices) {
    var lista = {};
    
    for (var i = 0; i < numVertices; i++) {
        lista[i] = [];
    }
    
    return lista;
}

