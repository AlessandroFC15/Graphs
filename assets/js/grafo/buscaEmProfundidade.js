var cor = {}, predecessor = {}, tempo = 0, d = {}, f = {};

var dfs = function (graph, verticeInicial, listaVertices) {
    cor = {};
    predecessor = {};
    d = {};
    f = {};

    if (listaVertices === undefined) {
        listaVertices = graph.getListaVertices();

        listaVertices = listaVertices.filter(function (element) {
            return element != verticeInicial
        });

        listaVertices.unshift(verticeInicial);
    }

    for (var u in listaVertices) {
        cor[listaVertices[u]] = 'BRANCO';
        predecessor[listaVertices[u]] = null;
    }

    tempo = 0;

    for (var u in listaVertices) {
        if (cor[listaVertices[u]] == 'BRANCO') {
            visitaDFS(listaVertices[u], graph);
        }
    }
};

var visitaDFS = function (u, graph) {
    cor[u] = 'CINZA';
    tempo++;
    d[u] = tempo;

    var adjacentes = graph.getVerticesAdjacentes(u);

    for (var i in adjacentes) {
        var v = adjacentes[i];

        if (cor[v] == 'BRANCO') {
            predecessor[v] = u;
            visitaDFS(v, graph);
        }
    }

    cor[u] = 'PRETO';
    tempo++;
    f[u] = tempo;
};

function atualizarTabelaDFS(d, f, grafo, idTabela, idButtonTabela) {
    var tabelaBody = $('tbody', idTabela);

    tabelaBody.empty();

    var listaVertices = grafo.getListaVertices();

    for (var i in listaVertices) {
        var vertice = listaVertices[i];

        var tr = document.createElement('tr');

        tr.appendChild(getTableCell(vertice));
        tr.appendChild(getTableCell(d[vertice]));
        tr.appendChild(getTableCell(f[vertice]));

        tabelaBody.append(tr);
    }

    if (idButtonTabela !== undefined) {
        $(idButtonTabela).removeClass('hidden');
    }
}

function atualizarOrdemDeVisitaDFS(ordemVisita, idMensagem) {
    var mensagem = $(idMensagem);
    mensagem.removeClass('hidden');
    mensagem.removeClass('alert-danger');
    mensagem.addClass('alert-success');

    mensagem.text('Ordem de visita: ' + ordemVisita.join(' --> '));
}