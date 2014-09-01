var simbolos = [],
  estados = [],
  ocorrencias = {},
  palavraAtual = "",
  _estadoAtual = "q0",
  entrada = null;

//Gera saída em texto
var montaVisualizacao = function() {
  var saida = "";
  var palavras = Object.keys(ocorrencias);
  for(var i = 0; i < palavras.length; i++) {
    var info = ocorrencias[palavras[i]];
    saida += "<br>Palavra: " + palavras[i] + " " + info.length + " ocorrências.";
    saida += "<br>Posições:<br>";
    for(var j = 0, l = info.length; j < l; j++) {
      saida += "("+ info[j].lin +", "+ info[j].col +")<br>";
    }
    saida += "<br>-----------------------------";
  }

  ocorrencias = {};
  _estadoAtual = "q0";
  palavraAtual = "";

  return saida;
};

//Pega o objeto do estado a partir do seu nome
var getEstado = function(estado) {
  for(var i = 0, l = estados.length; i < l; i++) {
    if(estados[i].id === parseInt(estado.substr(1), 10)) {
      return estados[i];
    }
  }
  return null;
};

//Processa cada transicao individualmente
var processaTransicao = function(estado, _simbolo) {
  //Varre os estados procurando um correspondente
  palavraAtual += _simbolo;
  //Retorna o próximo estado = transição
  if(simbolos.indexOf(_simbolo) === -1) {
    palavraAtual = "";
    _estadoAtual = "q0";
    return false;
  }
  var proximoEstado = getEstado(estado).transicoes[_simbolo];
  //Não existindo volta false = nada previsto na transição
  return proximoEstado || false;
};

//Retorna true se a mensagem foi aceita ou false se não foi aceita
var processaAutomato = function() {
  //Sempre começa no q0, isso é convencionado
  var aceita, linha = 1, coluna = 1;

  //Imediatamente rejeita se a entrada for nula ou não existirem estados
  if(entrada === null) return false;
  if(estados.length === 0) return false;

  //Roda transições para cada símbolo da entrada
  for(var i = 0, l = entrada.length; i < l; i++) {
    if(entrada[i] === "\n") {
      linha++;
      coluna = 1;
    }
    var p = processaTransicao(_estadoAtual, entrada[i]);
    if(!p) {
      if(getEstado(_estadoAtual).final) {
        //palavras.push(palavraAtual);
        if(ocorrencias[palavraAtual]) {
          ocorrencias[palavraAtual].push({
            lin: linha,
            col: (coluna-palavraAtual.length)+1
          });
        }
        else {
          ocorrencias[palavraAtual] = [{
            lin: linha,
            col: (coluna-palavraAtual.length)+1
          }];
        }
      }
      palavraAtual = "";
      _estadoAtual = "q0";
    }
    else {
      _estadoAtual = p;
    }
    coluna++;
  }

  return montaVisualizacao();

};
