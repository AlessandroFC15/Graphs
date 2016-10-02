function GrafoListaAdjacencia(numVertices, tipoGrafo) {
    this.tipoGrafo = tipoGrafo;
    this.lista = initializarLista(numVertices);
    this.numVertices = numVertices;
}

GrafoListaAdjacencia.prototype.inserirAresta = function(verticeSaida, verticeChegada) {
    if (this.lista[verticeSaida] && this.lista[verticeChegada]) {
        this.lista[verticeSaida].push(parseInt(verticeChegada));
        this.lista[verticeSaida].sort(function compareNumbers(a, b) {
            return a - b;
        });

        if (this.tipoGrafo == NAO_DIRECIONADO && verticeSaida !== verticeChegada) {
            this.lista[verticeChegada].push(parseInt(verticeSaida));
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
            index = this.lista[verticeChegada].indexOf(parseInt(verticeSaida));

            if (index !== - 1) {
                this.lista[verticeChegada].splice(index, 1);
            }
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
};

GrafoListaAdjacencia.prototype.getClone = function() {
    var grafoClone = new GrafoListaAdjacencia(0, this.tipoGrafo);
    grafoClone.numVertices = this.numVertices;

    for (var i in this.lista) {
        grafoClone.lista[i] = this.lista[i].slice();
    }

    return grafoClone;
};

GrafoListaAdjacencia.prototype.isEleuriano = function() {
    var listaVertices = this.getListaVertices();

    for (var i in listaVertices) {
        var grauVertice = this.getGrauVertice(listaVertices[i]);

        if (grauVertice % 2 != 0) {
            return false;
        }
    }

    return true;
};

GrafoListaAdjacencia.prototype.getCicloEuleriano = function() {
    var vertice = this.getListaVertices()[0];

    var g = this.getClone();

    if (vertice !== undefined) {
        return [vertice].concat(g.printEulerUtil(vertice));
    }
};

GrafoListaAdjacencia.prototype.printEulerUtil = function(vertice) {
    var adjacentes = this.getVerticesAdjacentes(vertice);

    for (var i = 0; i < adjacentes.length; i++) {
        var v = adjacentes[i];

        if (this.isValidNextEdge(vertice, v)) {
            this.removerAresta(parseInt(vertice), v);

            var aux = this.printEulerUtil(v);

            return [v].concat(aux !== undefined ? aux : []);
        }
    }
};

GrafoListaAdjacencia.prototype.isValidNextEdge = function(u, v) {
    var listaVertices = this.getListaVertices();

    var adjacentes = this.getVerticesAdjacentes(u);

    // 1) A aresta u-v será valida caso v seja o único adjacente de u
    if (adjacentes.length == 1) {
        return true;
    }

    // 2) Caso contrário, faremos o seguinte algoritmo para checar se (u, v) é uma ponte ou não

    // 2.a) Contar o número de vértices alcançáveis partindo de u
    var visited = {};
    for (var i in listaVertices) { visited[listaVertices[i]] = false; }
    var count1 = DFSCount(this, u, visited);

    // 2.b) Remover a aresta (u, v) and após a remoção, contar o número de vértices alcançáveis
    // novamento
    this.removerAresta(u, v);

    for (var i in listaVertices) { visited[listaVertices[i]] = false; }
    var count2 = DFSCount(this, u, visited);

    // 2.c) Adicionar a resta de volta
    this.inserirAresta(u, v);

    // 2.d) Caso a variável count1 seja maior do que a count2, então a aresta (u, v) é uma ponte.
    return (count1 > count2)? false : true;
};

GrafoListaAdjacencia.prototype.encontrarArticulacoes = function() {
    var visited = {}, disc = {}, low = {}, parent = {}, ap = {};
    var tempo = 0;

    for (var i in this.lista) {
        parent[i] = null;
        visited[i] = false;
        ap[i] = false;
    }

    for (var i in this.lista) {
        if (visited[i] === false) {
            this.encontrarArticulacoesUtil(i, visited, disc, low, parent, ap, tempo);
        }
    }

    var pontosDeArticulacao = [];

    for (var i in this.lista) {
        if (ap[i] === true) {
            pontosDeArticulacao.push(i);
        }
    }

    return pontosDeArticulacao;
};

GrafoListaAdjacencia.prototype.encontrarArticulacoesUtil = function(u, visited, disc, low, parent, ap, tempo) {
    var children = 0; // Número de filhos na árvore DFS

    visited[u] = true; // Vértice atual como visitado

    disc[u] = low[u] = ++tempo; // Inicializando tempo de descoberta

    var adjacentes = this.getVerticesAdjacentes(u);

    for (var i = 0; i < adjacentes.length; i++) {
        var v = adjacentes[i];

        // Caso v não tenha sido visitado, marcar como filho de u na árvore
        if (! visited[v]) {
            children++;
            parent[v] = u;
            this.encontrarArticulacoesUtil(v, visited, disc, low, parent, ap, tempo);

            // Checar se a subárvore com raiz em v possui conexão a um dos antecessores de u
            low[u]  = Math.min(parseInt(low[u]), parseInt(low[v]));

            // U é uma articulação em um dos dois casos abaixo

            // 1 => U é raiz da árvore DFS and possui 2 ou mais filhos.
            if (parent[u] === null && children > 1)
                ap[u] = true;

            // 2 => U não é raiz e o valor 'low' de um dos seus filhos é maior do que o tempo de descoberta de u.
            if (parent[u] !== null && low[v] >= disc[u])
                ap[u] = true;
        } else if (v != parent[u]) {
            low[u] = Math.min(parseInt(low[u]), parseInt(disc[v]));
        }
    }
};

GrafoListaAdjacencia.prototype.caminhoMinimoDijkstra = function (vertice) {
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

function getCaminho(origem, destino, antecessor) {
    if (origem == destino) {
        return [origem];
    } else if (antecessor[destino] == -1){
        return [];
    } else {
        return this.getCaminho(origem, antecessor[destino], antecessor).concat(destino);
    }
}

function DFSCount(grafo, v, visited) {
    visited[v] = true;
    var count = 1;

    var adjacentes = grafo.getVerticesAdjacentes(v);

    for (var i = 0; i < adjacentes.length; i++) {
        if (! visited[adjacentes[i]]) {
            count += DFSCount(grafo, adjacentes[i], visited);
        }
    }

    return count;
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