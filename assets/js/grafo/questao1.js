const DIGITS_FLOAT = 6;

function existeAresta() {
    var verticeSaida = $('#verticeSaida').val();
    var verticeChegada = $('#verticeEntrada').val();
    var escolhaGrafo = $('input[name=\'escolhaGrafo\']:checked').val();
    var escolhaImplementacao = $('input[name=\'escolhaImplementacao\']:checked').val();

    var grafoEscolhido = getGrafoEscolhido(escolhaGrafo, escolhaImplementacao);

    var testeExisteAresta = grafoEscolhido.grafo.existeAresta(verticeSaida, verticeChegada);

    var performance = getPerformanceTime(function() {
        grafoEscolhido.grafo.existeAresta(verticeSaida, verticeChegada);
    }, 5);

    imprimirMensagem(testeExisteAresta, verticeSaida, verticeChegada, grafoEscolhido, performance, escolhaImplementacao);
}

function imprimirMensagem(existeAresta, verticeSaida, verticeChegada, grafoEscolhido, performance, escolhaImplementacao) {
    var mensagem = $('#mensagem');

    var html = "<strong>";

    if (existeAresta) {
        html += "A aresta (" + verticeSaida + ', ' + verticeChegada + ') existe no ' + grafoEscolhido.texto + '.';
        mensagem.removeClass("alert-danger");
        mensagem.addClass("alert-success");
    } else {
        html += 'A aresta (' + verticeSaida + ', ' + verticeChegada + ') não existe no ' + grafoEscolhido.texto + '.';
        mensagem.removeClass("alert-success");
        mensagem.addClass("alert-danger");
    }

    html += '</strong>';

    html += '<br>Performance: ' + (performance.toFixed(5)) + 's (Implementação de ' + escolhaImplementacao.capitalize() +')';

    mensagem.html(html);

    mensagem.removeClass('hidden');
}

function atualizarTabelaPerformance() {
	var tabelaBody = $('#tabelaPerformance tbody');
	
	var rows = 5, iterations = 20, html = '';
	
	for (var i = 0; i < rows; i++) {
		var verticeSaida = getRandomInt(0, 7);
		var verticeChegada = getRandomInt(0, 7);
		
		html += '<tr>';
		
		var performanceMatriz = getPerformanceTime(function () { grafoMatrizCompleto.existeAresta(verticeSaida, verticeChegada); }, iterations);
		var performanceLista = getPerformanceTime(function () { grafoListaAdjacenciaCompleto.existeAresta(verticeSaida, verticeChegada); }, iterations);
		
		if (Math.abs(performanceMatriz - performanceLista).toFixed(DIGITS_FLOAT) != '0.000000') {
			if (performanceMatriz > performanceLista) {
			html += '<td class="danger">' + performanceMatriz.toFixed(DIGITS_FLOAT) + '</td>';
			html += '<td class="success">' + performanceLista.toFixed(DIGITS_FLOAT) + '</td>';
			} else if (performanceMatriz < performanceLista){
				html += '<td class="success">' + performanceMatriz.toFixed(DIGITS_FLOAT) + '</td>';
				html += '<td class="danger">' + performanceLista.toFixed(DIGITS_FLOAT) + '</td>';
			} else {
				console.log('aisdasdsa');
			}
		} else {
			html += '<td class="info">' + performanceMatriz.toFixed(DIGITS_FLOAT) + '</td>';
			html += '<td class="info">' + performanceLista.toFixed(DIGITS_FLOAT) + '</td>';
		}
		
		html += '<td>' + Math.abs(performanceMatriz - performanceLista).toFixed(6) + '</td>';
		
		html += '<td>' + '(' + verticeSaida + ',' + verticeChegada + ')' + '</td>'
		
		html += '</tr>';
	}
	
	tabelaBody.html(html);	
}

$(function() {
    grafoMatriz.atualizarSelect('#verticeSaida');
    grafoMatriz.atualizarSelect('#verticeEntrada');

    atualizarTabelaGrafoMatriz(grafoMatriz, "#tabelaMatrizAdjacenciaGrafoG");
    atualizarTabelaGrafoMatriz(grafoMatrizCompleto, "#tabelaMatrizAdjacenciaGrafoH");

    grafoListaAdjacencia.printListaAdjacencia('#tabelaListaAdjacenciaGrafoG');
    grafoListaAdjacenciaCompleto.printListaAdjacencia('#tabelaListaAdjacenciaGrafoH');
	
	atualizarTabelaPerformance();
});
