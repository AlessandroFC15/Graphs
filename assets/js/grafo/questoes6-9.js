/**
 * Created by mystic_alex on 25/08/16.
 */

var grafo;

function getGrafoMatrizQuestao6_9() {
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

$(function() {
    grafo = getGrafoMatrizQuestao6_9();
});