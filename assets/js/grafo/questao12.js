/**
 * Created by mystic_alex on 21/08/16.
 */

var grafo;

const S = 0;
const U = 1;
const V = 2;
const X = 3;
const Y = 4;

$(function () {
    grafo = getDigrafoM();

    getMenorCaminho(S);
});

function getDigrafoM() {
    var grafo = new GrafoMatriz(5, DIRECIONADO);

    grafo.inserirAresta(S, U, 10);
    grafo.inserirAresta(S, X, 5);
    grafo.inserirAresta(Y, S, 7);
    grafo.inserirAresta(X, U, 3);
    grafo.inserirAresta(U, X, 2);
    grafo.inserirAresta(U, V, 1);
    grafo.inserirAresta(X, V, 9);
    grafo.inserirAresta(X, Y, 2);
    grafo.inserirAresta(Y, V, 6);
    grafo.inserirAresta(V, Y, 4);

    return grafo;
}

function getMenorCaminho(vertice) {
    var dadosCaminhoMinimo = grafo.caminhoMinimoDijkstra(vertice);

    atualizarTabela(dadosCaminhoMinimo, conversao[vertice], '#tabelaMenorCaminhoDji');

    $('#verticeEscolhidoSpan').html(conversao[vertice]);
}

function atualizarTabela(dadosCaminhoMinimo, verticeOrigem, idTabela) {
    var html = '';

    for (var vertice in dadosCaminhoMinimo) {
        if (vertice != verticeOrigem) {
            html += getRowTabela(dadosCaminhoMinimo[vertice], vertice);
        }
    }

    $(idTabela + ' tbody').html(html);
}

function getRowTabela(dadosVertice, vertice) {

    return '<tr>' +
            '<td>' + vertice + '</td>' +
            '<td>' + dadosVertice.distancia + '</td>' +
            '<td>' + dadosVertice.caminho.map(convertNumberToLetter).join(' -> ') + '</td>' +
            ' </tr>'
}

function convertNumberToLetter(number) {
    return conversao[number];
}

var conversao = {
    0 : 'S',
    1 : 'U',
    2 : 'V',
    3 : 'X',
    4 : 'Y'
};