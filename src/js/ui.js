(function (document) {

  /* Configuracao dos simbolos */
  document.getElementById('form_alfabeto').addEventListener('submit', function (e) {
    e.returnValue = false;
    var tabela = document.getElementById('alfabeto'),
      simbolo = document.getElementById('simbolo');
    if (simbolo && simbolo.value.length > 0) {
      simbolos.push(simbolo.value);
      alfabeto.tBodies[0].innerHTML += '<tr><td>' + simbolo.value + '</td><td><a href="#" class="alfabeto-remover" data-val="' + simbolo.value + '" title="Remover">Remover</a></td></tr>';
      simbolo.value = '';
      simbolo.focus();
    }
  });

  document.getElementById('configurar_estados').addEventListener('click', function () {
    document.getElementById('configuracao_alfabeto').classList.add('hidden');

    var cabecalho = '';
    for (var i = 0; i < simbolos.length; i++) {
      cabecalho += '<th>' + simbolos[i] + '</th>';
    }

    document.getElementById('automato').tHead.rows[0].innerHTML += cabecalho;

    document.getElementById('configuracao_estados').classList.remove('hidden');
  });

  document.getElementById('alfabeto').addEventListener('click', function (e) {
    var target = e.target;
    if (target.classList.contains('alfabeto-remover')) {
      var valor = target.dataset.val;
      if (valor) {
        for (var i = 0; i < simbolos.length; i++) {
          if (valor === simbolos[i]) {
            simbolos.splice(i, 1);
            break;
          }
        }
        if (target.parentNode && target.parentNode.parentNode) {
          target.parentNode.parentNode.remove();
        }
      }
    }
  });

  var gerarOptionEstado = function (indice) {
    var option = document.createElement('option');
    option.text = '{q' + indice + '}';
    option.value = 'q' + indice;

    return option;
  };

  var popularNovosEstados = function () {
    var selects = document.querySelectorAll('#automato select');
    if (selects && selects.length > 0) {
      var i = 0,
        qtd = selects.length;

      for (; i < qtd; i++) {
        for (var x = 0; x < estados.length; x++) {
          if (document.querySelector('#' + selects[i].id + ' option[value=q' + estados[x].id + ']') === null) {
            selects[i].add(gerarOptionEstado(estados[x].id));
          }
        }
      }
    }
  };

  var novoEstado = function (callback) {
    var qtdEstados = estados.length;
    var linha = '<tr><td>{q' + qtdEstados + '}<a href="#" data-estado="' + qtdEstados + '" class="remover_estado" title="Remover: Todos as transições serão removidas.">Remover</a></td>';
    for (var i = 0; i < simbolos.length; i++) {
      linha += '<td><select id="q' + qtdEstados + '_' + simbolos[i] + '"><option value="">NULL</option><option value="0">Novo estado</option></select></td>';
    }
    linha += '</tr>';

    var el = document.createElement('tr');

    el.innerHTML = linha;

    document.getElementById('automato').appendChild(el);

    estados.push({
      id: qtdEstados
    });

    popularNovosEstados();

    if (callback && typeof callback === 'function') {
      callback(qtdEstados);
    }
  };

  /* Configuracao dos estados */
  document.getElementById('novo_estado').addEventListener('click', function () {
    novoEstado();
  });

  var incluirTransicoesEstados = function (target, estado) {
    // Cria vinculo de estado
    var id = target.id.replace('q', ''),
      estadoSimbolo = id.split('_');

    if (estadoSimbolo.length === 2) {
      if (estados[estadoSimbolo[0]]) {
        // Os ids são separados por estado_simbolo, por isso:
        // estadoSimbolo[0] = estado
        // estadoSimbolo[1] = simbolo

        //Vincula no estado com id estadoSimbolo[0], no simbolo estadoSimbolo[1], o estado selecionado
        estados[estadoSimbolo[0]][estadoSimbolo[1]] = estado;
      }
    }
  };

  document.getElementById('automato').addEventListener('change', function (e) {
    var target = e.target;
    if (target && target.tagName === 'SELECT') {
      if (target.value === '0') {
        // Criar novo estado
        novoEstado(function (estado) {
          document.getElementById(target.id).value = 'q' + estado;
          incluirTransicoesEstados(target, 'q' + estado);
        });
      }
      else if (target.value !== '') {
        // Cria transicao em estados
        incluirTransicoesEstados(target, target.value);
      }
      else {
        // Remove completamente transicao
        var id = target.id.replace('q', ''),
          estadoSimbolo = id.split('_');

        delete estados[estadoSimbolo[0]][estadoSimbolo[1]];
      }
    }
  });

  document.getElementById('automato').addEventListener('click', function (e) {
    var target = e.target;

    if (target.tagName === 'A') {
      var estado = target.dataset.estado;

      // Remover todos os vinculos a este estado
      for (var i = 0; i < estados.length; i++) {
        if (i != estado) {
          for (attr in estados[i]) {
            if (!isNaN(attr) && estados[i][attr] === 'q' + estado) {
              // Deixa os selects com valor NULL
              document.getElementById('q' + i + '_' + attr).value = '';

              // Deleta propriedade de transicao
              delete estados[i][attr];
            }
          }
        }
      }

      // Deleta linha com estado
      if (target.parentNode && target.parentNode.parentNode) {
        target.parentNode.parentNode.remove();
      }

      // Remove estado do array
      estados.splice(estado, 1);

      // Remover estado dos selects
      var selects = document.querySelectorAll('#automato select');
      if (selects && selects.length > 0) {
        var i = 0,
          qtd = selects.length;

        for (; i < qtd; i++) {
          var el = document.querySelector('#' + selects[i].id + ' option[value=q' + estado + ']');
          if (el !== null) {
            el.remove();
          }
        }
      }
    }


    e.preventDefault();
    return false;
  });

  document.getElementById('salvar_estados').addEventListener('click', function () {
    var linhas = document.getElementById('automato').tBodies[0].rows;
  });


  // Execucoes iniciais
  document.getElementById('simbolo').focus();

}(document));
