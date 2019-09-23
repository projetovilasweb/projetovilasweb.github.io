//termo
//expressão
//grupo
//string de visualização
//string IEEE
//string ACM
//string Scholar


let elements = [] //array que contém todos os elementos da classe texto criados ao longo da execução do sistema
let string = []
let order = 0;
let validation_flag = 0;

class Text{ //emgloba grupo, termo e expressão

    constructor(exp, type){
        this.content = exp;
        this.type = type; // tipo: 1 - termo, 2 - expressão
        this.v = 1;
    }
    

}

class Operator{
    constructor(type){
        this.type = type //recebe o tipo do operador (1. AND; 2. OR; 3. (; 4. ) )
        this.v = 0;
    } 
}

//para cada termo, grupo ou expressão adicionada, cria um novo text.
// atualiza as operações realizadas entre os texts sequencialmente nas estruturas de dados de cada uma das 
//basas de pesquisa
//Botão de UNDO => remover, sequencialmente, os texts adicionados => ID sequencial (var global ou static, pesquisar)