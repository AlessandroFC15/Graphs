/**
 * Created by mystic_alex on 21/08/16.
 */

var cor = [], predecessor = [], tempo = 0, d = [], f = [];

var dfs = function (verticeInicial) {
    cor = [];
    predecessor = [];
    d = [];
    f = [];

    for (var u = 0; u < grafo.numVertices; u++) {
        cor[u] = 'BRANCO';
        predecessor[u] = null;
    };

    tempo = 0;

    var listaVertices = [...Array(grafo.numVertices).keys()];

    listaVertices = listaVertices.filter(function(element){ return element != verticeInicial});

    listaVertices.unshift(verticeInicial);

    for (var u = 0; u < grafo.numVertices; u++) {
        if (cor[listaVertices[u]] == 'BRANCO') {
            visitaDFS(listaVertices[u]);
        }
    };
}

var visitaDFS = function(u) {
    cor[u] = 'CINZA';
    tempo++;
    d[u] = tempo;

    var adjacentes = grafo.getVerticesAdjacentes(u);

    for (var i in adjacentes) {
        var v = adjacentes[i];

        if (cor[v] == 'BRANCO') {
            predecessor[v] = u;
            visitaDFS(v);
        }
    }

    cor[u] = 'PRETO';
    tempo++;
    f[u] = tempo;
}

function atualizarTabelaDFS() {
    var tabelaBody = $('#tabelaDFS tbody');

    tabelaBody.empty();

    for (var i = 0; i < grafo.numVertices; i++) {
        var tr = document.createElement('tr');

        tr.appendChild(getTableCell(i));
        tr.appendChild(getTableCell(d[i]));
        tr.appendChild(getTableCell(f[i]));
       
        tabelaBody.append(tr);
    }
}

var getTableCell = function (content) {
    var cell = document.createElement('td');

    cell.appendChild(document.createTextNode(content));

    return cell;
};

function getCaminhoMaisCurto(origem, destino) {
    var retorno = $('#caminhoMaisCurtoResultado');

    var caminhoMaisCurto = grafo.caminhoMaisCurto(origem, destino);

    if (caminhoMaisCurto) {
        retorno.html("O caminho mais curto de " + origem + ' até ' + destino + ' é ' + caminhoMaisCurto.join(' -> '));
        retorno.removeClass('alert-danger');
        retorno.addClass('alert-success');
    } else {
        retorno.html("Não existe caminho de " + origem + ' até ' + destino + '.');
        retorno.removeClass('alert-success');
        retorno.addClass('alert-danger');
    }

    retorno.removeClass('hidden');
}

function atualizarOrdemDeVisitaDFS(ordemVisita) {
    var mensagem = $('#ordemDeVisita');
    mensagem.removeClass('hidden');

    mensagem.find('span').text(ordemVisita.join(' --> '));
}

$(function() {
    encontrarBuscaEmProfundidade(0);
});

function encontrarBuscaEmProfundidade(verticeInicial) {
    dfs(verticeInicial);

    atualizarTabelaDFS();

    var inicioTempoVertices = [];

    for (var i = 0; i < grafo.numVertices; i++) {
        inicioTempoVertices.push({indice: i, inicio: d[i]});
    }

    inicioTempoVertices.sort(function(a, b) { 
        return a.inicio - b.inicio;
    });

    ordemVisita = inicioTempoVertices.map(function(element) { return element.indice;})

    atualizarOrdemDeVisitaDFS(ordemVisita);
}


