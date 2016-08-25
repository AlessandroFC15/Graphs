/**
 * Created by mystic_alex on 25/08/16.
 */

var grafoMatriz;
var grafoListaAdjacencia;

var grafoMatrizCompleto;
var grafoListaAdjacenciaCompleto;

const REPRESENTACAO_MATRIZ = "representacao_matriz";
const REPRESENTACAO_LISTA = "representacao_lista";

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

function getGrafoEscolhido(escolhaGrafo, escolhaImplementacao) {
    if (escolhaGrafo == 'grafoG' && escolhaImplementacao == 'matriz'){
        return {grafo: grafoMatriz,
            texto: 'grafo G'};
    } else if (escolhaGrafo == 'grafoG' && escolhaImplementacao == 'lista') {
        return {grafo: grafoListaAdjacencia,
            texto: 'grafo G'};
    } else if (escolhaGrafo == 'grafoH' && escolhaImplementacao == 'matriz') {
        return {grafo: grafoMatrizCompleto,
            texto: 'grafo H (Completo)'};
    } else if (escolhaGrafo == 'grafoH' && escolhaImplementacao == 'lista') {
        return {grafo: grafoListaAdjacenciaCompleto,
            texto: 'grafo H (Completo)'};
    } else {
        console.log("Erro em escolha de grafo!");
        return undefined;
    }
}

$(function() {
    grafoMatriz = getGrafoMatrizQuestao1();
    grafoListaAdjacencia = getGrafoListaAdjacenciaQuestao1();

    grafoMatrizCompleto = grafoMatriz.getGrafoCompleto();
    grafoListaAdjacenciaCompleto = grafoListaAdjacencia.getGrafoCompleto();
});