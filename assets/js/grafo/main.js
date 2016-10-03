var network, grafoNetwork;
var networkNaoDirecionado, grafoNetworkNaoDirecionado;

var criarGrafoDirecionadoQuestao6 = function (id, representacao) {
    // create an array with nodes
    var nodes = new vis.DataSet([
            {id: 0, label: '0', x: 0, y: 0, physics: false},
            {id: 1, label: '1', x: 200, y: 0, physics: false},
            {id: 2, label: '2', x: 100, y: 0, physics: false},
            {id: 3, label: '3', x: 0, y: 100, physics: false},
            {id: 4, label: '4', x: 200, y: 100, physics: false},
            {id: 5, label: '5', x: 0, y: -100, physics: false},
            {id: 6, label: '6', x: 200, y: -100, physics: false},
            {id: 7, label: '7', x: -100, y: 100, physics: false},
            {id: 8, label: '8', x: 100, y: 100, physics: false},
            {id: 9, label: '9', x: -100, y: 0, physics: false}
        ]
    );

    // create an array with edges
    var edges = new vis.DataSet([
        {from: 0, to: 2, id: '0to2'},
        {from: 0, to: 3, id: '0to3'},
        {from: 1, to: 4, id: '1to4'},
        {from: 1, to: 8, id: '1to8'},
        {from: 2, to: 5, id: '2to5'},
        {from: 5, to: 6, id: '5to6'},
        {from: 6, to: 2, id: '6to2'},
        {from: 4, to: 8, id: '4to8'},
        {from: 3, to: 7, id: '3to7'},
        {from: 3, to: 8, id: '3to8'},
        {from: 8, to: 0, id: '8to0'},
        {from: 9, to: 7, id: '9to7'},
        {from: 7, to: 9, id: '7to9'}
    ]);

    return criarGrafo(nodes, edges, id, representacao, DIRECIONADO);
};

var criarGrafoNaoDirecionadoQuestao6 = function (id, representacao) {
    // create an array with nodes
    var nodes = new vis.DataSet([
            {id: 0, label: '0', x: 0, y: 0, physics: false},
            {id: 1, label: '1', x: 200, y: 0, physics: false},
            {id: 2, label: '2', x: 200, y: 150, physics: false},
            {id: 3, label: '3', x: 0, y: 150, physics: false},
        ]
    );

    // create an array with edges
    var edges = new vis.DataSet([
        {from: 0, to: 1, id: '0to1'},
        {from: 1, to: 2, id: '1to2'},
        {from: 2, to: 3, id: '2to3'},
        {from: 3, to: 0, id: '3to0'},

    ]);

    return criarGrafo(nodes, edges, id, representacao, NAO_DIRECIONADO);
};

var getRepresentacaoGrafoNaoDirecionadoQuestao6 = function (tipoGrafo) {
    var grafo = new tipoGrafo(4, NAO_DIRECIONADO);

    grafo.inserirAresta(0, 1);
    grafo.inserirAresta(1, 2);
    grafo.inserirAresta(2, 3);
    grafo.inserirAresta(3, 0);

    return grafo;
};

var getGrafoQuestao6_9 = function (tipoGrafo) {
    var grafo = new tipoGrafo(10, DIRECIONADO);

    grafo.inserirAresta(9, 7);
    grafo.inserirAresta(7, 9);
    grafo.inserirAresta(3, 7);
    grafo.inserirAresta(0, 2);
    grafo.inserirAresta(0, 3);
    grafo.inserirAresta(8, 0);
    grafo.inserirAresta(3, 8);
    grafo.inserirAresta(4, 8);
    grafo.inserirAresta(1, 8);
    grafo.inserirAresta(1, 4);
    grafo.inserirAresta(2, 5);
    grafo.inserirAresta(5, 6);
    grafo.inserirAresta(6, 2);

    return grafo;
};

/*PARTE DE EXISTE ARESTA ?*/

function existeAresta(grafoEscolhido, network, verticeOut, verticeIn, mensagem) {
    var verticeSaida = $(verticeOut).val();
    var verticeChegada = $(verticeIn).val();

    var testeExisteAresta = grafoEscolhido.existeAresta(verticeSaida, verticeChegada);

    var performance = getPerformanceTime(function() {
        grafoEscolhido.existeAresta(verticeSaida, verticeChegada);
    }, 5);

    imprimirMensagem(testeExisteAresta, verticeSaida, verticeChegada, performance, mensagem);
}

function imprimirMensagem(existeAresta, verticeSaida, verticeChegada, performance, idMensagem) {
    var mensagem = $(idMensagem);

    var html = "<strong>";

    if (existeAresta) {
        html += "A aresta (" + verticeSaida + ', ' + verticeChegada + ') existe no grafo acima.';
        mensagem.removeClass("alert-danger");
        mensagem.addClass("alert-success");
    } else {
        html += 'A aresta (' + verticeSaida + ', ' + verticeChegada + ') não existe no grafo acima.';
        mensagem.removeClass("alert-success");
        mensagem.addClass("alert-danger");
    }

    html += '</strong>';

    html += '<br>Performance: ' + (performance.toFixed(5)) + 's';

    mensagem.html(html);

    mensagem.removeClass('hidden');
}

/*VÉRTICES ADJACENTES*/

function getVerticesAdjacentes(grafo, v, msg) {
    var vertice = $(v).val();
    var mensagem = $(msg);

    if (! grafo.existeVertice(vertice)) {
        mensagem.html('O vértice ' + vertice + ' não existe no grafo.');
        mensagem.addClass('alert-danger');
        mensagem.removeClass('alert-success');
        mensagem.removeClass('hidden');
        return;
    }

    var adjacentes = grafo.getVerticesAdjacentes(vertice).sort();

    if (adjacentes.length > 0) {
        mensagem.html('Vértices adjacentes do vértice ' + vertice + ': <br> <strong>' + adjacentes.join(', ') + '</strong>');
        mensagem.addClass('alert-success');
        mensagem.removeClass('alert-danger');
    } else {
        mensagem.html('O vértice ' + vertice + ' não possui vértices adjacentes.');
        mensagem.addClass('alert-danger');
        mensagem.removeClass('alert-success');
    }

    mensagem.removeClass('hidden');
}

/*DFS*/

function encontrarBuscaEmProfundidade(verticeInicial, grafo, idMensagem, idTabela, idButtonTabela) {
    if (! grafo.existeVertice(verticeInicial)) {
        imprimirMensagemErro(idMensagem, verticeInicial, idButtonTabela);
        return;
    }

    dfs(grafo, verticeInicial);

    atualizarTabelaDFS(d, f, grafo, idTabela, idButtonTabela);

    var inicioTempoVertices = [];

    var listaVertices = grafo.getListaVertices();

    for (var i in listaVertices) {
        inicioTempoVertices.push({indice: listaVertices[i], inicio: d[listaVertices[i]]});
    }

    inicioTempoVertices.sort(function (a, b) {
        return a.inicio - b.inicio;
    });

    var ordemVisita = inicioTempoVertices.map(function (element) {
        return element.indice;
    });

    atualizarOrdemDeVisitaDFS(ordemVisita, idMensagem);
}

var getTableCell = function (content) {
    var cell = document.createElement('td');

    cell.appendChild(document.createTextNode(content));

    return cell;
};

var imprimirMensagemErro = function (idMensagem, verticeInicial, idButtonTabela) {
    var mensagem = $(idMensagem);
    mensagem.removeClass('hidden');
    mensagem.removeClass('alert-success');
    mensagem.addClass('alert-danger');

    mensagem.text('O vértice ' + verticeInicial + ' não existe no grafo!');

    if (idButtonTabela !== undefined) {
        $(idButtonTabela).addClass('hidden');
    }
};

/*COMPONENTES FORTEMENTE CONEXOS*/

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
};

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
};

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
};

/*EXISTE CICLO?*/

var existeCiclo = function(grafo, idMensagem) {
    var mensagem = $(idMensagem);

    if (grafo.existeCiclo()) {
        mensagem.removeClass('alert-danger').addClass('alert-success');
        mensagem.html("<strong>Existe ciclo no grafo acima!</strong>")
    } else {
        mensagem.removeClass('alert-success').addClass('alert-danger');
        mensagem.html('<strong>Não existe ciclo no grafo acima!</strong>');
    }

    mensagem.removeClass('hidden');
};

/*CAMINHO MAIS CURTO*/

var getCaminhoMaisCurto = function(grafo, origem, destino, idMensagem) {
    var retorno = $(idMensagem);

    if (isNaN(parseInt(origem))) {
        retorno.removeClass('hidden').removeClass('alert-success').addClass('alert-danger');
        retorno.html('Insira um vértice de origem válido!');
        return;
    }

    if (isNaN(parseInt(destino))) {
        retorno.removeClass('hidden').removeClass('alert-success').addClass('alert-danger');
        retorno.html('Insira um vértice de destino válido!');
        return;
    }

    var caminhoMaisCurto = grafo.caminhoMaisCurto(origem, destino);

    if (caminhoMaisCurto && caminhoMaisCurto.length > 0) {
        if (caminhoMaisCurto.length == 1) {
            retorno.html("Os vértice inseridos são os mesmos!");
        } else {
            retorno.html("O caminho mais curto de " + origem + ' até ' + destino + ' é ' + caminhoMaisCurto.join(' -> ') + '.');
        }

        retorno.addClass('alert-success');
        retorno.removeClass('alert-danger');

    } else {
        retorno.html("Não existe caminho de " + origem + ' até ' + destino + '.');
        retorno.removeClass('alert-success');
        retorno.addClass('alert-danger');
    }

    retorno.removeClass('hidden');
};

/*EULERIANO*/

var isEleurian = function (grafo, idMensagem) {
    var mensagem = $(idMensagem);

    if (grafo.isEleuriano()) {
        var html = 'O grafo inserido é euleriano.';

        mensagem.removeClass('alert-danger').addClass('alert-success');

        html += '<p>Ciclo Euleriano: ' + grafo.getCicloEuleriano().join(' -> ') + '</p>';

        mensagem.html(html);
    } else {
        mensagem.html('O grafo inserido NÃO é euleriano.');
        mensagem.removeClass('alert-success').addClass('alert-danger');
    }

    mensagem.removeClass('hidden');

};

/*PONTOS DE ARTICULAÇÃO*/

var encontrarPontosDeArticulacao = function (grafo, network, idMensagem) {
    var mensagem = $(idMensagem);

    var pontosDeArticulacao = grafo.encontrarArticulacoes();

    if (pontosDeArticulacao.length > 0) {
        mensagem.removeClass('alert-danger').addClass('alert-success');
        mensagem.html('Pontos de Articulação: ' + pontosDeArticulacao.join(', '));
        network.selectNodes(pontosDeArticulacao, [false]);
    } else {
        mensagem.html('Não existem pontos de articulação no grafo acima.');
        mensagem.removeClass('alert-success').addClass('alert-danger');
    }

    mensagem.removeClass('hidden');

};

$(function () {
    grafoNetwork = getGrafoQuestao6_9(GrafoListaAdjacencia);
    network = criarGrafoDirecionadoQuestao6('mynetwork', grafoNetwork);

    grafoNetworkNaoDirecionado = getRepresentacaoGrafoNaoDirecionadoQuestao6(GrafoListaAdjacencia);
    networkNaoDirecionado = criarGrafoNaoDirecionadoQuestao6('grafoVisualNaoDirecionado', grafoNetworkNaoDirecionado);
});