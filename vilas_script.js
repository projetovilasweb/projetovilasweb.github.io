

//constante utilizada para adicionar os termos e operadores inseridos pelo usuário à pagina
const vQ = document.getElementById("view_input")

//eventos de teclado para funcionamento da tecla enter no input de dados
$("#t").keypress(function(event) { 
  if (event.keyCode === 13) { 
      $("#b").click(); 
  } 
}); 

//tratamento de entradas de texto
function handleInput(){

    const div = document.createElement('div');
    let flagspace = 0; //flag para o controle, caso seja termo ou expressão
    input = document.getElementsByName('inputs')[0].value; 

    for(let i = 0; i< input.length; i++){
      
      if(input[i] == ' '){
        input = "\""+input+"\"";
        div.setAttribute('id', 'expression')
        flagspace = 1;
        break;
      }
    }
    if(flagspace == 0){
      div.setAttribute('id', 'text')
    }
  
    //seta os valores da div do input
    div.innerHTML = input
    div.setAttribute('class', 'slide')
    div.setAttribute('order', order)
    div.setAttribute('ondblclick', 'deleteElement('+order+')')
    order++;
    vQ.appendChild(div)

    document.getElementById("t").value = '' // limpa a caixa de texto no html
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

      if(content.length == 0){
        alert('Não podem existir termos sem conteúdo')
          string = []
          flag =1 
          updateView(flag)
          return false
      }
     
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
  
  //substituição dos elementos da string pelos correspondentes da codificação IEEE
  for(let i=0; i <string.length ; i++){
    let exp = string[i]
    if(exp.v == 1){
      if(exp.type == 1){
      IEEEString =IEEEString+exp.content
    }
      else{
        let e = exp.content
        e = e.substr(1)
        e = e.slice(0, -1)
        e = e.replace(/ /g, '%20')
        IEEEString =IEEEString+'.QT.'+e+'.QT.'
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
  
  IEEEString = "https://ieeexplore.ieee.org/search/searchresult.jsp?action=search&matchBoolean=true&searchField=Search_All_Text&queryText=("+IEEEString+")&newsearch=true";
  window.open(IEEEString, '_blank');

});

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
  
  //substituição dos elementos da string pelos correspondentes da codificação ACN
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



$(document).ready(function() {
  $(".hor-inp").css({
    'min-width': ($(".bound-2").width() + 'px')
  });
});

$( window ).resize( function(){

  $(".hor-inp").css({
    'min-width': ($(".bound-2").width() + 'px')
  });

});
  
function openLink(){
  window.open("help.html", '_blank');
}