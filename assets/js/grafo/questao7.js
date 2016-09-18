/**
 * Created by mystic_alex on 21/08/16.
 */

var network;
var grafoNetwork, grafo;

var networkNaoDirecionado, grafoNetworkNaoDirecionado;

var visitaDFSComponentes = function (u, graph, subGrafo) {
    subGrafo.push(u);

    cor[u] = 'CINZA';
    tempo++;
    d[u] = tempo;

    var adjacentes = graph.getVerticesAdjacentes(u);

    for (var i in adjacentes) {
        var v = adjacentes[i];

        if (cor[v] == 'BRANCO') {
            predecessor[v] = u;
            visitaDFSComponentes(v, graph, subGrafo);
        }
    }

    cor[u] = 'PRETO';
    tempo++;
    f[u] = tempo;
};

var encontrarSubGrafosBuscaEmProfundidade = function(verticeInicial, graph, listaVertices) {
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

    var subGrafos = [];
    var subGrafoAtual = [];

    for (var u in listaVertices) {
        if (cor[listaVertices[u]] == 'BRANCO') {

            visitaDFSComponentes(listaVertices[u], graph, subGrafoAtual);

            if (subGrafoAtual.length > 0) {
                subGrafos.push(subGrafoAtual);
            }

            subGrafoAtual = [];
        } 
    }

    if (subGrafoAtual.length > 0) 
        subGrafos.push(subGrafoAtual);

    return subGrafos;
}

var imprimirComponentesFortementeConexos = function(componentes, idMensagem) {
    var mensagem = $(idMensagem);

    mensagem.empty();

    if (componentes.length > 0) {
        var strong  = document.createElement('strong');
        
        for (var i = 0; i < componentes.length; i++) {
            var componente = document.createElement("p");
            componentes[i].sort(function(a,b){return a - b});
            componente.appendChild(document.createTextNode((i + 1) + 'º componente: ' + componentes[i].join(', ')));
            strong.appendChild(componente);
        }

        mensagem.append(strong);
    } else {
        mensagem.html('Não existem componentes fortemente conexos no grafo!');
    }

    mensagem.removeClass('hidden');
}

var getComponentesFortementeConexos = function(grafo, idMensagem) {
    // Aplicar a busca em profundidade no grafo G para obter os tempos de término para cada vértice u.
    dfs(grafo, '0');

    var temposTermino = [];

    // Obter o grafo transposto GT
    var grafoTransposto = grafo.getGrafoTransposto();

    // Aplicar a busca em profundidade no grafo GT, realizando a
    // busca a partir do vértice de maior tempo obtido na linha 1. Se
    // a busca em profundidade não alcançar todos os vértices,
    // inicie uma nova busca em profundidade a partir do vértice de
    // maior tempo dentre os vértices restantes.

    var listaVertices = grafo.getListaVertices();

    for (var i in listaVertices) {
        temposTermino.push({indice: listaVertices[i], tempoTermino: f[listaVertices[i]]});
    }

    temposTermino.sort(function (a, b) {
        return b.tempoTermino - a.tempoTermino;
    });

    var ordemVisitaVertices = temposTermino.map(function (element) {
        return element.indice;
    });

    var subgrafos = encontrarSubGrafosBuscaEmProfundidade('0', grafoTransposto, ordemVisitaVertices);

    imprimirComponentesFortementeConexos(subgrafos, idMensagem);
}


