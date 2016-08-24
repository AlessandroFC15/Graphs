
var grafoMatriz;
var grafoListaAdjacencia;

var grafoMatrizCompleto;
var grafoListaAdjacenciaCompleto;

const REPRESENTACAO_MATRIZ = "representacao_matriz";
const REPRESENTACAO_LISTA = "representacao_lista";

function updateCell(verticeSaida, verticeChegada, pesoAresta) {
    var rowToChange = $("tbody tr:" + "nth(" + verticeSaida + ")");

    var cell = rowToChange[0].cells[Number(verticeChegada) + 1];

    cell.innerHTML = pesoAresta;

    cell.className = 'text-success';
}

/*function existeAresta() {
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
}*/

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

function getGrafoMatrizQuestao1() {
    var grafo = new GrafoMatriz(8, NAO_DIRECIONADO);
    
    grafo.inserirAresta(0, 1);
    grafo.inserirAresta(0, 3);
    grafo.inserirAresta(0, 4);
    grafo.inserirAresta(1, 2);
    grafo.inserirAresta(1, 5);
    grafo.inserirAresta(2, 7);
    grafo.inserirAresta(2, 3);
    grafo.inserirAresta(3, 6);
    grafo.inserirAresta(4, 5);
    grafo.inserirAresta(4, 6);
    grafo.inserirAresta(5, 7);
    grafo.inserirAresta(7, 6);

   return grafo;
}

function getGrafoListaAdjacenciaQuestao1() {
    var grafo =  new GrafoListaAdjacencia(8, NAO_DIRECIONADO);

    grafo.inserirAresta(0, 1);
    grafo.inserirAresta(0, 3);
    grafo.inserirAresta(0, 4);
    grafo.inserirAresta(1, 2);
    grafo.inserirAresta(1, 5);
    grafo.inserirAresta(2, 7);
    grafo.inserirAresta(2, 3);
    grafo.inserirAresta(3, 6);
    grafo.inserirAresta(4, 5);
    grafo.inserirAresta(4, 6);
    grafo.inserirAresta(5, 7);
    grafo.inserirAresta(7, 6);

    return grafo;
}

function getGrafoEscolhido(escolhaGrafo) {
    switch (escolhaGrafo) {
        case 'grafoGMatriz':
            return {grafo: grafoMatriz,
                texto: 'grafo G'};
        case 'grafoHMatriz':
            return {grafo: grafoMatrizCompleto,
                texto: 'grafo H (Completo)'};
        case 'grafoGLista':
            return {grafo: grafoListaAdjacencia,
                texto: 'grafo G'};
        case 'grafoHLista':
            return {grafo: grafoListaAdjacenciaCompleto,
                texto: 'grafo H (Completo)'};
        default:
            console.log("Erro em escolha de grafo!");
            return undefined;
    }
}

function existeAresta(verticeSaida, verticeChegada, mensagem, escolhaGrafo) {
    var grafoEscolhido = getGrafoEscolhido(escolhaGrafo);

    var inicio = performance.now();

    var testeExisteAresta = grafoEscolhido.grafo.existeAresta(verticeSaida, verticeChegada);

    var fim = performance.now();

    if (testeExisteAresta) {
        mensagem.html("A aresta (" + verticeSaida + ', ' + verticeChegada + ') existe no ' + grafoEscolhido.texto + '.');
        mensagem.removeClass("alert-danger");
        mensagem.addClass("alert-success");
    } else {
        mensagem.html('A aresta (' + verticeSaida + ', ' + verticeChegada + ') não existe no ' + grafoEscolhido.texto + '.');
        mensagem.removeClass("alert-success");
        mensagem.addClass("alert-danger");
    }

    mensagem.removeClass('hidden');
}

function getVerticesAdjacentes(vertice, escolhaGrafo, divRetorno) {
    var grafoEscolhido = getGrafoEscolhido(escolhaGrafo);

    var inicio = performance.now();
    
    var adjacentes = grafoEscolhido.grafo.getVerticesAdjacentes(vertice);

    var fim = performance.now();

    if (adjacentes && adjacentes.length > 0) {
        divRetorno.html('Vértices adjacentes do vértice ' + vertice + ': <br> <strong>' + adjacentes.join(', ') + '</strong>');
    } else {
        divRetorno.html('O vértice ' + vertice + ' não possui vértices adjacentes.');
    }

    divRetorno.append('<br>Performance: ' + (fim - inicio) + ' ms');
    divRetorno.removeClass('hidden');
}

function atualizarTabelaProcessamento(idTabela, escolhaGrafo) {
    var grafo;
    var grafoCompleto;

    if (escolhaGrafo == REPRESENTACAO_MATRIZ) {
        grafo = grafoMatriz;
        grafoCompleto = grafoMatrizCompleto;
    } else if (escolhaGrafo == REPRESENTACAO_LISTA) {
        grafo = grafoListaAdjacencia;
        grafoCompleto = grafoListaAdjacenciaCompleto;
    }

    var html = '';

    for (var i = 0; i < grafo.numVertices; i++) {
        html += getRowTabelaProcessamento(grafo, grafoCompleto, i);
    }

    $(idTabela + ' tbody').html(html);
}

function getRowTabelaProcessamento(grafo, grafoCompleto, vertice) {
    var performanceGrafoG = getPerformanceTime(grafo, vertice, 50);

    var performanceGrafoH = getPerformanceTime(grafoCompleto, vertice, 50);

    var adjacentesGrafo = grafo.getVerticesAdjacentes(vertice);

    var adjacentesCompleto = grafoCompleto.getVerticesAdjacentes(vertice);

    var fim1 = performance.now();

    var inicio2 = performance.now();


    var fim2 = performance.now();

    return '<tr>' +
                '<td>' + vertice + '</td>' +
                '<td>' + performanceGrafoG + '</td>' +
                '<td>' + adjacentesGrafo.join(', ') + '</td>' +
                '<td>' + performanceGrafoH + '</td>' +
                '<td>' + adjacentesCompleto.join(', ') + '</td>' +
            '</tr>'
}

function getPerformanceTime(grafo, vertice, iterations) {
    var totalTime = 0;

    for (var i = 0; i < iterations; i++) {
        var inicio = performance.now();

        grafo.getVerticesAdjacentes(vertice);

        var fim = performance.now();

        totalTime += (fim - inicio);
    }

    return totalTime / iterations;
}

$(function() {
    grafoMatriz = getGrafoMatrizQuestao1();
    grafoListaAdjacencia = getGrafoListaAdjacenciaQuestao1();

    grafoMatrizCompleto = grafoMatriz.getGrafoCompleto();
    grafoListaAdjacenciaCompleto = grafoListaAdjacencia.getGrafoCompleto();

    grafoMatriz.atualizarSelect('#verticeSaidaExisteArestaMatriz');
    grafoMatriz.atualizarSelect('#verticeChegadaExisteArestaMatriz');
    grafoMatriz.atualizarSelect('#inputVerticeAdjacenteMatriz');

    grafoListaAdjacencia.atualizarSelect('#verticeSaidaExisteArestaLista');
    grafoListaAdjacencia.atualizarSelect('#verticeChegadaExisteArestaLista');
    grafoListaAdjacencia.atualizarSelect('#inputVerticeAdjacenteLista');

    atualizarTabelaGrafoMatriz(grafoMatriz, "#tabelaMatrizAdjacencia");
    grafoListaAdjacencia.printListaAdjacencia('#tabelaListaAdjacencia');

    atualizarTabelaProcessamento('#tabelaProcessamentoMatriz', REPRESENTACAO_MATRIZ);
    atualizarTabelaProcessamento('#tabelaProcessamentoLista', REPRESENTACAO_LISTA);
});