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


  // Execucoes iniciais
  document.getElementById('simbolo').focus();

}(document));
