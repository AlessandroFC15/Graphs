/**
 * Created by mystic_alex on 21/08/16.
 */

var grafo;

$(function() {
    grafo = getDigrafoQuestao();

    grafo.atualizarSelect('#verticeOrigem');
    grafo.atualizarSelect('#verticeDestino');
});

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

function getDigrafoQuestao() {
    var grafo = new GrafoMatriz(10, DIRECIONADO);

    grafo.inserirAresta(9, 7);
    grafo.inserirAresta(7, 9);
    grafo.inserirAresta(3, 7);
    grafo.inserirAresta(0, 3);
    grafo.inserirAresta(0, 2);
    grafo.inserirAresta(8, 0);
    grafo.inserirAresta(3, 8);
    grafo.inserirAresta(4, 8);
    grafo.inserirAresta(1, 8);
    grafo.inserirAresta(1, 4);
    grafo.inserirAresta(2, 5);
    grafo.inserirAresta(5, 6);
    grafo.inserirAresta(6, 2);

    return grafo;
}

function inverterVertices() {
    var verticeOrigem = $('#verticeOrigem');
    var verticeDestino = $('#verticeDestino');

    var temp = verticeOrigem.val();

    verticeOrigem.val(verticeDestino.val());
    verticeDestino.val(temp);
}