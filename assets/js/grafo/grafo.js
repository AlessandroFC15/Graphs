var grafoMatriz = new GrafoMatriz(5, 'naoDirecionado');

function GrafoMatriz(numVertices, tipoGrafo) {
	this.tipoGrafo = tipoGrafo;
	this.matriz = initializeMatriz(numVertices);
}

function initializeMatriz(numVertices) {
	var matriz = [];

	for (var i = 0; i < numVertices; i++) {
		var row = [];

		for (var j = 0; j < numVertices; j++) {
			row.push(0);
		}

		matriz.push(row);
	}

	return matriz;
}

function magic() {
    var numVertices = $("#numVerticesInput").val();
    var tipoGrafo = $("input[name=tipoGrafo]:checked").val();

    grafoMatriz = new GrafoMatriz(numVertices, tipoGrafo);

    atualizarGrafoMatriz(grafoMatriz);

    atualizarOpcoesDeVerticeParaArestas(grafoMatriz);
}

function atualizarGrafoMatriz(grafoMatriz) {
    var tabela = $(idTabelaMatriz);

    atualizarCabecalho(grafoMatriz);

    atualizarDados(grafoMatriz);
}

function atualizarCabecalho(grafoMatriz) {
    var cabecalho = $(idTabelaMatriz + ' thead tr');

    var html = '<th>#</th>';

    for (var i = 0; i < grafoMatriz.matriz.length; i++) {
        html += '<th>' + i + '</th>';
    }

    cabecalho.html(html);
}

function atualizarDados(grafoMatriz) {
    var body = $('tbody', idTabelaMatriz);

    var html = '';

    for (var i = 0; i < grafoMatriz.matriz.length; i++) {
        html += getRowDados(i, grafoMatriz.matriz[i]);
    }

    body.html(html);
}

function getRowDados(i, array) {
    var tableData = '<td>' + i  +'</td>';

    for (var i = 0; i < array.length; i++)
        tableData +=  '<td>' + array[i]  +'</td>';

    return '<tr>' + tableData + '</tr>';
}

function atualizarOpcoesDeVerticeParaArestas(grafoMatriz) {
    atualizarSelect("#arestaFrom", grafoMatriz);
    atualizarSelect("#arestaTo", grafoMatriz);
    atualizarSelect("#verticeChegadaConsultaAresta", grafoMatriz);
    atualizarSelect("#verticeSaidaConsultaAresta", grafoMatriz);
    atualizarSelect("#verticeAdjacenteInput", grafoMatriz);
}

function inserirAresta() {
    var verticeSaida = $("#arestaFrom").val();
    var verticeChegada = $("#arestaTo").val();
    var pesoAresta = $("#pesoAresta").val() ? $("#pesoAresta").val() : 1;

    grafoMatriz.matriz[verticeSaida][verticeChegada] = pesoAresta;

    updateCell(verticeSaida, verticeChegada, pesoAresta);

    if (grafoMatriz.tipoGrafo == 'naoDirecionado') {
        grafoMatriz.matriz[verticeChegada][verticeSaida] = pesoAresta;
        updateCell(verticeChegada, verticeSaida, pesoAresta);
    }
}

function updateCell(verticeSaida, verticeChegada, pesoAresta) {
    var rowToChange = $("tbody tr:" + "nth(" + verticeSaida + ")");

    var cell = rowToChange[0].cells[Number(verticeChegada) + 1];

    cell.innerHTML = pesoAresta;

    cell.className = 'text-success';
}

function existeAresta() {
    var verticeSaida = $("#verticeChegadaConsultaAresta").val();
    var verticeChegada = $("#verticeSaidaConsultaAresta").val();

    var mensagem = $("#existeArestaMensagem");

    if (grafoMatriz.matriz[verticeSaida][verticeChegada]) {
        mensagem.html("A aresta (" + verticeSaida + ', ' + verticeChegada + ') existe e possui peso ' + grafoMatriz.matriz[verticeSaida][verticeChegada] + '.');
        mensagem.removeClass("alert-danger");
        mensagem.addClass("alert-success");
    } else {
        mensagem.html('A aresta (' + verticeSaida + ', ' + verticeChegada + ') não existe no grafo!');
        mensagem.removeClass("alert-success");
        mensagem.addClass("alert-danger");
    }

    mensagem.removeClass('hidden');
}

function getVerticesAdjacentes() {
    var vertice = $("#verticeAdjacenteInput").val();

    var retorno = $("#verticesAdjacentesRetorno");

    var adjacentes = [];

    for (var i = 0; i < grafoMatriz.matriz.length; i++) {
        if (grafoMatriz.matriz[vertice][i] != 0 && i != vertice)
            adjacentes.push(i);
    }

    if (adjacentes.length > 0) {
        retorno.html('Vértices adjacentes do vértice ' + vertice + ': <br> <strong>' + adjacentes.toString() + '</strong>');
    } else {
        retorno.html('O vértice ' + vertice + ' não possui vértices adjacentes.');
    }

    retorno.removeClass('hidden');
}

const idTabelaMatriz = "#tabelaMatrizAdjacencia";

$(function() {
    atualizarGrafoMatriz(grafoMatriz);
    atualizarOpcoesDeVerticeParaArestas(grafoMatriz);
});
