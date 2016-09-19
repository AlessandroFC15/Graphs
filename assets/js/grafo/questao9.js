var getCaminhoMaisCurto = function(grafo, origem, destino, idMensagem) {
    var caminhoMaisCurto = grafo.caminhoMaisCurto(origem, destino);

    var retorno = $(idMensagem);

    if (caminhoMaisCurto && caminhoMaisCurto.length > 0) {
        if (caminhoMaisCurto.length == 1) {
            retorno.html("Os vértice inseridos são os mesmos!");
        } else {
            retorno.html("O caminho mais curto de " + origem + ' até ' + destino + ' é ' + caminhoMaisCurto.join(' -> '));
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