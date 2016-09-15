/**
 * Created by mystic_alex on 20/08/16.
 */

function GrafoMatriz(numVertices, tipoGrafo) {
    this.tipoGrafo = tipoGrafo;
    this.matriz = initializeMatriz(numVertices);
    this.numVertices = numVertices;
}

GrafoMatriz.prototype.inserirAresta = function(verticeSaida, verticeChegada, pesoAresta) {
    if (pesoAresta == undefined)
        pesoAresta = 1;

    this.matriz[verticeSaida][verticeChegada] = pesoAresta;

    if (this.tipoGrafo == NAO_DIRECIONADO) {
        this.matriz[verticeChegada][verticeSaida] = pesoAresta;
    }
};

GrafoMatriz.prototype.existeAresta = function(verticeSaida, verticeChegada) {
    return this.matriz[verticeSaida][verticeChegada] != undefined &&
        this.matriz[verticeSaida][verticeChegada] != 0;
};

GrafoMatriz.prototype.atualizarSelect = function (idSelect) {
    var select = $(idSelect);

    var options = "";

    for (var i = 0; i < this.matriz.length; i++) {
        options += '<option>' + i +'</option>';
    }

    select.html(options);
};

GrafoMatriz.prototype.getGrafoCompleto = function () {
    var grafoCompleto = new GrafoMatriz(this.matriz.length, this.tipoGrafo);

    for (var i = 0; i < this.matriz.length; i++) {
        for (var j = 0; j < this.matriz.length; j++) {
            grafoCompleto.matriz[i][j] = (j != i ? 1 : 0);
        }
    }

    return grafoCompleto;
};

GrafoMatriz.prototype.getVerticesAdjacentes = function(vertice) {
    if (this.matriz[vertice]) {
        var adjacentes = [];

        for (var i = 0; i < this.matriz.length; i++) {
            if (this.matriz[vertice][i] != 0 && i != vertice)
                adjacentes.push(i);
        }

        return adjacentes;
    }
};

GrafoMatriz.prototype.buscaEmLargura = function(verticeEscolhido) {
    if (verticeEscolhido >= 0 && verticeEscolhido < this.numVertices) {
        var grafoBusca = this.iniciarBuscaEmLargura(verticeEscolhido);

        var Q = [grafoBusca[verticeEscolhido]];

        while (Q.length > 0) {
            var u = Q[0];

            Q = Q.slice(1);

            var adj = this.getVerticesAdjacentes(u.indice);

            for (var i in adj) {
                var v = grafoBusca[adj[i]];

                if (v.cor == 'BRANCO') {
                    v.cor = 'CINZA';
                    v.distancia = u.distancia + 1;
                    v.antecessor = u.indice;
                    Q.push(v);
                }
            }

            u.cor = 'PRETO';
        }

        return grafoBusca;
    } else {
        console.log("Vértice inválido");
        return null;
    }
};

GrafoMatriz.prototype.iniciarBuscaEmLargura = function(verticeEscolhido) {
    var grafoBusca = [];

    for (var i = 0; i < this.numVertices; i++) {
        var vertice = {
            cor: 'BRANCO',
            distancia: Infinity,
            antecessor: -1,
            indice: i
        };

        grafoBusca.push(vertice);
    }

    grafoBusca[verticeEscolhido].cor = 'CINZA';
    grafoBusca[verticeEscolhido].distancia = 0;

    return grafoBusca;
};

GrafoMatriz.prototype.caminhoMaisCurto = function(origem, destino) {
    var buscaEmLargura = this.buscaEmLargura(origem);

    if (origem == destino) {
        return [origem];
    } else if (! buscaEmLargura[destino] || buscaEmLargura[destino].antecessor == -1) {
        return null;
    } else {
        return this.caminhoMaisCurto(origem, buscaEmLargura[destino].antecessor).concat(destino);
    }
};

GrafoMatriz.prototype.caminhoMinimoDijkstra = function (vertice) {
    var d = [];
    var antecessor = [];

    for (var i = 0; i < this.numVertices; i++) {
        d[i] = Infinity;
        antecessor[i] = -1;
    }

    d[vertice] = 0;

    var s = [];

    var q = range(0, this.numVertices - 1);

    while (q.length > 0) {
        var u = extrairMinimo(q, d);

        removeItem(q, u);

        s.push(u);

        var adj = this.getVerticesAdjacentes(u);

        for (var i in adj) {
            var v = adj[i];

            if (d[v] > d[u] + this.matriz[u][v]) {
                d[v] = d[u] + this.matriz[u][v];
                antecessor[v] = u;
            }
        }
    }
    
    return formatarDados(d, antecessor, vertice);
};

GrafoMatriz.prototype.getListaVertices = function() {
    var lista = [...Array(this.numVertices).keys()];

    return lista.map(function(element) { return element.toString()});
};

GrafoMatriz.prototype.existeVertice = function(vertice) {
    return this.getListaVertices().indexOf(vertice.toString()) != -1
};

GrafoMatriz.prototype.resetarGrafo = function(numVertices) {
    this.lista = initializeMatriz(numVertices);
    this.numVertices = numVertices;
};

function formatarDados(d, antecessor, vertice) {
    var dados = {};
    
    for (var i = 0; i < d.length; i++) {
        var v = {
            distancia: d[i],
            antecessor: antecessor[i],
            caminho: this.getCaminho(vertice, i, antecessor)
        };

        dados[conversao[i]] = v;
    }
    
    return dados;
}

function getCaminho(origem, destino, antecessor) {
    if (origem == destino) {
        return [origem];
    } else if (antecessor[destino] == -1){
        return [];
    } else {
        return this.getCaminho(origem, antecessor[destino], antecessor).concat(destino);
    }
}

function initializeMatriz(numVertices) {
    var matriz = [];

    for (var i = 0; i < numVertices; i++) {
        var row = [];

        for (var j = 0; j < numVertices; j++) {
            row.push(0);
        }

        matriz.push(row);
    }

    return matriz;
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

const NAO_DIRECIONADO = 'naoDirecionado';
const DIRECIONADO = 'direcionado';
