function GrafoListaAdjacenciaComPeso(numVertices, tipoGrafo) {
    this.tipoGrafo = tipoGrafo;
    this.lista = initializarLista(numVertices);
    this.numVertices = numVertices;
}

GrafoListaAdjacenciaComPeso.prototype = Object.create(GrafoListaAdjacencia.prototype);

GrafoListaAdjacenciaComPeso.prototype.inserirAresta = function(verticeSaida, verticeChegada, pesoAresta) {
    if (this.lista[verticeSaida] && this.lista[verticeChegada]) {
        this.lista[verticeSaida][verticeChegada.toString()] = parseInt(pesoAresta)

        if (this.tipoGrafo == NAO_DIRECIONADO && verticeSaida !== verticeChegada) {
            this.lista[verticeChegada][verticeSaida.toString()] = parseInt(pesoAresta)
        }
    } else {
        console.log("# Insira vértices válidos. #");
    }
};

function initializarLista(numVertices) {
    var lista = {};
    
    for (var i = 0; i < numVertices; i++) {
        lista[i] = {};
    }
    
    return lista;
}

GrafoListaAdjacenciaComPeso.prototype.getListaVertices = function() {
    return Object.keys(this.lista).map(function (element) { return Number(element)});
};

GrafoListaAdjacenciaComPeso.prototype.getVerticesAdjacentes = function (vertice) {
    if (this.lista[vertice]) {
        return Object.keys(this.lista[vertice]).map(function(element) { return Number(element)});
    }
};

GrafoListaAdjacenciaComPeso.prototype.caminhoMinimoDijkstra = function (vertice) {
    var d = {};
    var antecessor = {};

    for (var i in this.lista) {
        d[i] = Infinity;
        antecessor[i] = -1;
    }

    d[vertice] = 0;

    var s = [];

    var q = this.getListaVertices();

    while (q.length > 0) {
        var u = extrairMinimo(q, d);

        removeItem(q, u);

        s.push(u);

        var adj = this.getVerticesAdjacentes(u);

        for (var i in adj) {
            var v = adj[i];

            if (d[v] > d[u] + this.lista[u][v]) {
                d[v] = d[u] + this.lista[u][v];
                antecessor[v] = u;
            }
        }
    }

    console.log(antecessor);

    console.log(d);

    
    return formatarDados(d, antecessor, vertice);
};

GrafoListaAdjacenciaComPeso.prototype.getArestas = function() {
    var arestas = [];

    for (var i in this.lista) {
        var adj = this.getVerticesAdjacentes(i);

        for (var j = 0; j < adj.length; j++) {
            arestas.push([parseInt(i), adj[j]]);
        }
    }

    return arestas;
}

GrafoListaAdjacenciaComPeso.prototype.removerAresta = function(verticeSaida, verticeChegada) {
    if (this.lista.hasOwnProperty(verticeSaida) && this.lista.hasOwnProperty(verticeChegada)) {
        delete this.lista[verticeSaida][verticeChegada];

        if (this.tipoGrafo == NAO_DIRECIONADO && verticeSaida !== verticeChegada) {
            delete this.lista[verticeSaida][verticeChegada];
        }
    } else {
        console.log('A aresta não existe no grafo!');
    }
};

GrafoListaAdjacenciaComPeso.prototype.caminhoMinimoBF = function (vertice) {
    var d = {};
    var antecessor = {};

    for (var i in this.lista) {
        d[i] = Infinity;
        antecessor[i] = -1;
    }

    d[vertice] = 0;

    var listaArestas = this.getArestas();

    for (var i = 1; i < this.numVertices; i++) {
        for (var j = 0; j < listaArestas.length; j++) {
            var u, v;
            [u, v] = listaArestas[j];

            if (d[v] > d[u] + this.lista[u][v]) {
                d[v] = d[u] + this.lista[u][v];
                antecessor[v] = u;
            }
        }
    }

    for (var i = 0; i < listaArestas.length; i++) {
        var u, v;
        [u, v] = listaArestas[i];

        if (d[v] > d[u] + this.lista[u][v]) {
            console.log(u + '|' + v);
            console.log('Graph contains a negative-weight cycle');
            return false;
        }
    }

    return formatarDados(d, antecessor, vertice);
};

GrafoListaAdjacenciaComPeso.prototype.encontrarAGMPrim = function (r) {
    var key = {};
    var antecessor = {};

    for (var u in this.lista) {
        key[u] = Infinity;
        antecessor[u] = -1;
    }

    key[r] = 0

    var q = this.getListaVertices();

    while (q.length > 0) {
        var u = extrairMinimo(q, key);

        removeItem(q, u);

        var adj = this.getVerticesAdjacentes(u);

        for (var i in adj) {
            var v = adj[i];

            if (q.indexOf(v) != -1 && this.lista[u][v] < key[v]) {
                antecessor[v] = u;
                key[v] = this.lista[u][v];
            }
        }
    }

    return this.getAGM(antecessor, key);
}

GrafoListaAdjacenciaComPeso.prototype.getAGM = function(antecessor, key) {
    var arvore = new GrafoListaAdjacenciaComPeso(this.numVertices, this.tipoGrafo);

    for (var i in antecessor) {
        if (antecessor[i] !== -1) {
            arvore.inserirAresta(antecessor[i], i, key[i]);
        }
    }

    return arvore;
}

function getCaminho(origem, destino, antecessor) {
    if (origem == destino) {
        return [parseInt(origem)];
    } else if (antecessor[destino] == -1){
        return [];
    } else {
        return this.getCaminho(origem, antecessor[destino], antecessor).concat(parseInt(destino));
    }
}

function formatarDados(d, antecessor, vertice) {
    var dados = {};
    
    for (var i in d) {
        var v = {
            distancia: d[i],
            antecessor: antecessor[i],
            caminho: getCaminho(vertice, i, antecessor)
        };

        dados[i] = v;
    }
    
    return dados;
}

function extrairMinimo(q, d) {
    return q.reduce(function (a, b){
        if (d[b] < d[a])
            return b;
        else
            return a;
    });
}

// Helpers

function range(start, end, step) {
    if (step == undefined)
        if (start <= end)
            step = 1;
        else
            step = -1;

    var range = [];

    if (step > 0) {
        for (var i = start; i <= end; i++)
            range.push(i);
    } else if (step < 0) {
        for (var i = start; i >= end; i += step)
            range.push(i);
    }

    return range;
}

function remove (array , index ) {
    return array . slice (0, index )
        . concat ( array . slice ( index + 1));
}

function removeItem(array, element) {
    var position = array.indexOf(element);

    if (position != -1) {
        array.splice(position, 1);
    }

}