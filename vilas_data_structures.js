
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
        this.type = type //recebe o tipo do operador (1. AND; 2. OR; 3. () )
        this.v = 0;
    } 
}

