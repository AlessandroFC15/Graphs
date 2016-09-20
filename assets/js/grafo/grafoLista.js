function GrafoListaAdjacencia(numVertices, tipoGrafo) {
    this.tipoGrafo = tipoGrafo;
    this.lista = initializarLista(numVertices);
    this.numVertices = numVertices;
}

GrafoListaAdjacencia.prototype.inserirAresta = function(verticeSaida, verticeChegada) {
    if (this.lista[verticeSaida] && this.lista[verticeChegada]) {
        this.lista[verticeSaida].push(verticeChegada);
        this.lista[verticeSaida].sort(function compareNumbers(a, b) {
            return a - b;
        });

        if (this.tipoGrafo == NAO_DIRECIONADO && verticeSaida !== verticeChegada) {
            this.lista[verticeChegada].push(verticeSaida);
            this.lista[verticeChegada].sort(function compareNumbers(a, b) {
                return a - b;
            });
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
    if (vertice === undefined)
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
        var index = this.lista[verticeSaida].indexOf(parseInt(verticeChegada));

        if (index !== - 1) {
            this.lista[verticeSaida].splice(index, 1);
        }

        if (this.tipoGrafo == NAO_DIRECIONADO && verticeSaida !== verticeChegada) {
            var index = this.lista[verticeChegada].indexOf(parseInt(verticeSaida));

            if (index != - 1)
                this.lista[verticeChegada].splice(index, 1);
        }
    } else {
        console.log('A aresta não existe no grafo!');
    }
};

GrafoListaAdjacencia.prototype.getListaVertices = function() {
    return Object.keys(this.lista);
};

GrafoListaAdjacencia.prototype.existeVertice = function(vertice) {
    return this.getListaVertices().indexOf(vertice.toString()) != -1
};

GrafoListaAdjacencia.prototype.resetarGrafo = function(numVertices) {
    this.lista = initializarLista(numVertices);
    this.numVertices = numVertices;
};

GrafoListaAdjacencia.prototype.getGrafoTransposto = function() {
    var grafoTransposto = new GrafoListaAdjacencia(this.numVertices, this.tipoGrafo);

    for (var vertice in this.lista) {
        var adjacentes = this.lista[vertice];

        for (var i in adjacentes) {
            grafoTransposto.inserirAresta(adjacentes[i], vertice);
        }
    }

    return grafoTransposto;
};

GrafoListaAdjacencia.prototype.existeCiclo = function() {
    var visitados = {}, recStack = {};

    for (var vertice in this.lista) {
        visitados[vertice] = false;
        recStack[vertice] = false;
    }

    for (var vertice in this.lista) {
        if (this.existeCicloHelper(vertice, visitados, recStack)) {
            return true;
        }
    }

    return false;
};

GrafoListaAdjacencia.prototype.existeCicloHelper = function(vertice, visitados, recStack) {
    if (visitados[vertice] == false) {
        visitados[vertice] = true;
        recStack[vertice] = true;

        var adjacentes = this.getVerticesAdjacentes(vertice);

        for (var i = 0; i < adjacentes.length; i++) {
            if (! visitados[adjacentes[i]] && this.existeCicloHelper(adjacentes[i], visitados, recStack)) {
                return true;
            } else if (recStack[adjacentes[i]]) {
                return true;
            }
        }
    }

    recStack[vertice] = false;
    return false;
};

GrafoListaAdjacencia.prototype.caminhoMaisCurto = function(origem, destino) {
    if (this.existeVertice(origem) && this.existeVertice(destino)) {
        var buscaEmLargura = this.buscaEmLargura(origem);

        if (origem == destino) {
            return [origem];
        } else if (! buscaEmLargura[destino] || buscaEmLargura[destino].antecessor == -1) {
            return null;
        } else {
            return this.caminhoMaisCurto(origem, buscaEmLargura[destino].antecessor).concat(destino);
        }
    } else {
        return null;
    }
};

GrafoListaAdjacencia.prototype.iniciarBuscaEmLargura = function(verticeEscolhido) {
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

GrafoListaAdjacencia.prototype.buscaEmLargura = function(verticeEscolhido) {
    if (this.existeVertice(verticeEscolhido)) {
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

GrafoListaAdjacencia.prototype.getGrauVertice = function(vertice) {
    if (this.existeVertice(vertice)) {
        if (this.tipoGrafo == NAO_DIRECIONADO) {
            return this.lista[vertice].length
        } else {
            console.log('Não implementado, tá o acabando o tempo, galera!');
        }
    } else {
        console.log('Vértice inválido');
        return null;
    }
}

GrafoListaAdjacencia.prototype.isEleuriano = function() {
    var listaVertices = this.getListaVertices();

    for (var i in listaVertices) {
        var grauVertice = this.getGrauVertice(listaVertices[i]);

        if (grauVertice % 2 != 0) {
            return false;
        }
    }

    return true;
}

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

