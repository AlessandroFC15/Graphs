/**
 * Created by mystic_alex on 21/08/16.
 */

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
}

