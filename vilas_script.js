
//limpeza do código
//organização
//Mais arquivos JS para melhor organização
//identação
//comentários
//documentação





const vQ = document.getElementById("view_input")

//eventos de teclado para funcionamento da tecla enter no input de dados
$("#t1").keypress(function(event) { 
  if (event.keyCode === 13) { 
      $("#b1").click(); 
  } 
}); 
$("#t2").keypress(function(event) { 
  if (event.keyCode === 13) { 
      $("#b2").click(); 
  } 
}); 

//tratamento de entradas de texto
function handleInput(type){
    
    const div = document.createElement('div');
    
    if (type == 1){
      input = document.getElementsByName('texts')[0].value;
      div.setAttribute('id', 'text')
    }
    else if(type == 2){
      input = document.getElementsByName('expressions')[0].value;
      input = "\""+input+"\"";
      div.setAttribute('id', 'expression')
    }
    
  
    
    
    div.innerHTML = input
    div.setAttribute('class', 'slide')
    div.setAttribute('order', order)
    div.setAttribute('ondblclick', 'deleteElement('+order+')')
    order++;
    vQ.appendChild(div)
    

    document.getElementById("t1").value = ''
    document.getElementById("t2").value = ''
    

} 

//tratamento de operadores
function handleOperator(type){
    //tipo do operador (1. AND; 2. OR; 3. ambos os parênteses )
    const div = document.createElement('div');
    div.setAttribute('class', 'slide')
    div.setAttribute('ondblclick', 'deleteElement('+order+')')
    div.setAttribute('order', order)
    order++;
  
    if(type == 1){
        div.setAttribute('id', 'AND')
        div.innerHTML = 'AND'
    }
    else if(type == 2){
        div.setAttribute('id', 'OR')
        div.innerHTML = 'OR'
    }
    else if(type == 3){
        const div2 = document.createElement('div');
        div2.setAttribute('class', 'slide')
        div2.setAttribute('ondblclick', 'deleteElement('+order+')')
        div2.setAttribute('order', order)
        order++;
        div.setAttribute('id', 'pF')
        div2.setAttribute('id', 'pA')
        div.innerHTML = ')'
        div2.innerHTML = '('
        vQ.appendChild(div2)
    }
    vQ.appendChild(div)
}

//movimentação dos elementos visuais na string
$("#view_input").sortable({
    placeholder: 'slide-placeholder',
   axis: "x",
   revert: 150,
   start: function(e, ui){
       
       placeholderWidth = ui.item.outerWidth();
       ui.placeholder.width(placeholderWidth + 15);
       $('<div class="slide-placeholder-animator" data-width="' + placeholderWidth + '"></div>').insertAfter(ui.placeholder);
   
   },
   change: function(event, ui) {
       
       ui.placeholder.stop().width(0).animate({
           width: ui.item.outerWidth() + 15
       }, 300);
       
       placeholderAnimatorWidth = parseInt($(".slide-placeholder-animator").attr("data-width"));
       
       $(".slide-placeholder-animator").stop().width(placeholderAnimatorWidth + 15).animate({
           width: 0
       }, 300, function() {
           $(this).remove();
           placeholderWidth = ui.item.outerWidth();
           $('<div class="slide-placeholder-animator" data-width="' + placeholderWidth + '"></div>').insertAfter(ui.placeholder);
       });
       
   },
   stop: function(e, ui) {
       
       $(".slide-placeholder-animator").remove();
       
   },
});

//remover a string por inteiro
$('#bclear').click(function(){
  $('#view_query').empty()
  $('#view_input').empty()
  
})

//deletar elementos da string
function deleteElement(op){
  const element = document.querySelector('[order=\''+op+'\']')
  element.parentNode.removeChild(element)
}

//Validação lógica da string
$(' #validate ').click(function(){
  

  $('#view_query').empty()
  string = []
  let string_view = ''
  let flag = 0;
  validation_flag = 0;
  if(string.length == 0){
    alert('A string não pode estar vazia')
      string = []
      flag =1 
      updateView(flag)
      return false

  }

  $.each( $('#view_input'), function(i, view_input) {
      $('div', view_input).each(function(index) {
         let idme = $(this).attr('id')
         let idnext = $(this).next().attr('id')
         console.log(idnext)
      if(idme == idnext && (idme != 'pF' || idme != 'pA')){
        alertEquals(idme, index)
        string = []
        flag = 1 
        updateView(flag)
        return false
      } 
      else if(index == 0 && (idme == 'AND' || idme == 'OR')){
       
        alert('A string não pode ser iniciada por um operador AND ou OR')
        string = []
        flag =1 
        updateView(flag)
        return false
      }
      else if((idme == 'text' || idme == 'expression') && (idnext == 'pA')){
        alert('Termos e expressões não podem ser seguidos pela abertura de parênteses, devem ser intercalados por operadores (posições '+(index+1)+' e '+(index+2)+' da string)')
        string = []
        flag =1 
        updateView(flag)
        return false
      }
      else if((idme == 'AND' && idnext == 'OR') ||(idme == 'OR' && idnext == 'AND')){
        alert('Operadores AND e OR não podem ser seguidos (posições '+(index+1)+' e '+(index+2)+' da string)')
        string = []
        flag =1
        updateView(flag)
        return false
      }
      else if((idme == 'AND'  || idme == 'OR') && (idnext == 'pF')){
        alert('Parênteses devem ser finalizados por termos ou expressões, não operadores (posições '+(index+1)+' e '+(index+2)+ ' da string)')
        string = []
        flag =1
        updateView(flag)
        return false
      }
      else if(idme == 'text'){
        let a = $(this).html()
        if(a.indexOf(" ") >= 0){
          alert('Termos não devem ter espaços (posição '+(index+1)+' da string)')
          string = []
          flag =1 
          updateView(flag)

          return false
          
        }
      }
      else if((idme == 'AND' || idme == 'OR') && idnext == undefined){
        alert('Uma string não pode ser finalizada com operadores  (posição '+(index+1)+' da string)')
        string = []
        flag =1
        updateView(flag)
        return false
      }
      else if((idme == 'text' && idnext == 'expression') || (idme == 'expression' && idnext == 'text')){
        alert('Termos e expressões não podem ser seguidos um do outro (posições '+(index+1)+' e '+(index+2)+' da string')
        string = []
        flag =1
        updateView(flag)
        return false
      }
      let content = $(this).html()
     
      makeString(idme,content)
      string_view +=content+' '
  });
  
  
 });
    
 updateView(flag, string_view)
 if (flag == 0){
  alert('Sua string é válida')
  validation_flag = 1;
 }

}); 

//função auxiliar para alertar qual o tipo de elemento igual
function alertEquals(id, index){
  if(id == 'text'){
    alert('Não podem ocorrer dois termos seguidos (posições '+(index+1)+' e '+(index+2)+' da string)')
  }
  else if( id == 'expression'){
    alert('Não podem ocorrer duas expressões seguidas (posições '+(index+1)+' e '+(index+2)+' da string)')
  }
  else if( id == 'AND'){
    alert('Não podem ocorrer dois operadores AND seguidos (posições '+(index+1)+' e '+(index+2)+' da string)')
  }
  else if( id == 'OR'){
    alert('Não podem ocorrer dois operadores OR seguidos (posições '+(index+1)+' e '+(index+2)+' da string)')
  }
  string = []
  return false
}

//função auxiliar para a geração da string genérica
function makeString(id, content){
      let element;
      if(id == 'AND'){
        element = new Operator(1)
      }
      else if(id == 'OR'){
        element = new Operator(2)
      }
      else if(id == 'pA'){
        element = new Operator(3)
      }
      else if(id == 'pF'){
        element = new Operator(4)

      }
      else if(id == 'text'){
        element = new Text(content, 1)
      }
      else if( id == 'expression'){
        element = new Text(content,2)
      }
      string.push(element);
      
}

$('#IEEES').click(function(){
  if(validation_flag == 0){
    alert('Sua string ainda não foi validada, clique no botão "Validar String" para prossegir')
    return false;
  }
  let IEEEString = "";
  
  for(let i=0; i <string.length ; i++){
    let exp = string[i]
    console.log(exp.content)
    if(exp.v == 1){
      if(exp.type == 1){
      IEEEString =IEEEString+exp.content
    }
      else{
        let e = exp.content
        e = e.substr(1)
        e = e.slice(0, -1)
        e = e.replace(/ /g, '%20')
        IEEEString ='.QT.'+e+'.QT.'
      }
    }
    else{
      if(exp.type == 1){
        IEEEString=IEEEString+'%20AND%20'
      }
      else if(exp.type == 2){
        IEEEString=IEEEString+'%20OR%20'
      }
      else if(exp.type == 3){
        IEEEString=IEEEString+'('
      }
      else{
        IEEEString=IEEEString+')'
      }
    }

  
  }
  
  

console.log(IEEEString)

IEEEString = "https://ieeexplore.ieee.org/search/searchresult.jsp?action=search&matchBoolean=true&searchField=Search_All_Text&queryText=("+IEEEString+")&newsearch=true";

window.open(IEEEString, '_blank');



});


/*  COMETÁRIO ENGLOBANDO MÉTODO UTILIZANDO ACM BÁSICA
$('#ACMS').click(function(){
  let stringACM = []
  for(let i=0; i <string.length ; i++){
    let exp = string[i]
    if(exp.v == 1){
      if(exp.type == 1){
      stringACM.push(exp.content)
      }
      else{
        let e = exp.content
        e = e.replace(/ /g, '%20')
        stringACM.push(e)
      }
  
    }
    else{
      if(exp.type == 2){
        stringACM.push(' ')
      }
      else if(exp.type == 3){
        stringACM.push('(')
      }
      else if(exp.type == 4){
        stringACM.push(')')
      }
      else if(exp.type == 1){


      }
    }

  }

});

*/


function ACMAND(index, str){
  let newStr;
  let left = str[index-1];
  let right  = str[index+1];
  if(right.v == 1){//próxima posição da string é um termo
    if(left.v == 1){//posição anterior é um termo também
      letf='%252B'+left //talvez precise de um espaço no futuro, deixa aqui o cometário em caso de bug
      right='%20%%252B'+right
    }
    else{ // o lado esquerdo não é um termo ou expressão, sendo necessáriamente um parênteses fechado
         
    }


  }
  else{



  }
  


}


function updateView(flag,str = ''){
  if(flag == 1){
    console.log(flag)
    console.log('flag interno')
    $('#view_query').empty()
    return false;
    
  }
  let toAppend =' '+str
  console.log(flag)
  console.log('flag externo')
  const div = document.createElement('div');
  div.innerHTML = toAppend
  div.setAttribute('id', 'view_el')

  parent = document.getElementById('view_query')
  parent.appendChild(div)
}



//ACM SITE NOVO
/*
$('#ACMS').click(function(){
  let stringACM = []
  let m = string.length
  let textACM ='https://dlnext.acm.org/action/doSearch?AllField=' 
  for(let i=0; i <m ; i++){
    let exp = string[i]
    if(exp.v == 1){
      let e = exp.content
      console.log()
      if(i != 0){
        console.log(i)
        e ='+'+e
      }
      if(exp.type == 1){
      stringACM.push(e)
      }
      else{
        
        e = e.replace(/ /g, '+')
        stringACM.push(e)
      }
  
    }
    else{
      if(exp.type == 2){
        stringACM.push('+OR')
      }
      else if(exp.type == 3){
        stringACM.push('+%28')
      }
      else if( exp.type == 4){
        stringACM.push('+%29')
      }
      else if(exp.type == 1){
        stringACM.push('+AND')


      }
    }
    textACM+=stringACM[i]
  }
   
  window.open(textACM, '_blank');
});

*/
//QUERY SITE ANTIGO
$('#ACMS').click(function(){

if(validation_flag == 0){
    alert('Sua string ainda não foi validada, clique no botão "Validar String" para prossegir')
    return false;
  }
  let stringACM = []
  let m = string.length
  let textACM ='https://dl.acm.org/results.cfm?query=' 
  for(let i=0; i <m ; i++){
    let exp = string[i]
    if(exp.v == 1){
      let e = exp.content
      console.log()
      if(i != 0){
        console.log(i)
        e ='+'+e
      }
      if(exp.type == 1){
      stringACM.push(e)
      }
      else{
        
        e = e.replace(/ /g, '+')
        stringACM.push(e)
      }
  
    }
    else{
      if(exp.type == 2){
        stringACM.push('+OR')
      }
      else if(exp.type == 3){
        stringACM.push('+%28')
      }
      else if( exp.type == 4){
        stringACM.push('+%29')
      }
      else if(exp.type == 1){
        stringACM.push('+AND')


      }
    }
    textACM+=stringACM[i]
  }

  textACM+='&Go.x=22&Go.y=3'
   
  window.open(textACM, '_blank');
});



function clearForms(){
  this.value = ''
}