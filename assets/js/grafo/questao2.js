/**
 * Created by mystic_alex on 25/08/16.
 */

function getVerticesAdjacentes() {
    var vertice = $("#vertice").val();
    var escolhaGrafo = $('input[name=\'escolhaGrafo\']:checked').val();
    var escolhaImplementacao = $('input[name=\'escolhaImplementacao\']:checked').val();
    var mensagem = $('#mensagem');

    var grafoEscolhido = getGrafoEscolhido(escolhaGrafo, escolhaImplementacao);

    var adjacentes = grafoEscolhido.grafo.getVerticesAdjacentes(vertice).sort();

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

$(function () {
    grafoMatriz.atualizarSelect('#vertice');
});