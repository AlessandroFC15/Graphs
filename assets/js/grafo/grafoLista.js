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

GrafoListaAdjacencia.prototype.inserirVertice = function (vertice) {
    console.log(vertice);
    if (! vertice)
        this.lista[this.numVertices] = [];
    else
        this.lista[vertice] = [];
    this.numVertices += 1;
};

GrafoListaAdjacencia.prototype.removerVertice = function (vertice) {
    delete this.lista[vertice];
    this.numVertices -= 1;
    this.removerArestasDeVertice(vertice);
};

GrafoListaAdjacencia.prototype.removerArestasDeVertice = function (vertice) {
    for (var v in this.lista) {
        for (var i in this.lista[v]) {
            if (this.lista[v][i] == vertice) {
                this.lista[v].splice(i, 1);
            }
        }
    }
};

GrafoListaAdjacencia.prototype.removerAresta = function(verticeSaida, verticeChegada) {
    if (this.lista.hasOwnProperty(verticeSaida) && this.lista.hasOwnProperty(verticeChegada)) {
        this.lista[verticeSaida] = this.lista[verticeSaida].filter(function (vertice) {
            return vertice != verticeChegada;
        });

        if (this.tipoGrafo == NAO_DIRECIONADO) {
            this.lista[verticeChegada] = this.lista[verticeChegada].filter(function (vertice) {
                return vertice != verticeSaida;
            });
        }

    } else {
        console.log('A aresta não existe no grafo!');
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

