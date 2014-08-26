# Autômato finito determinístico genérico em JS

## Objetivo

O projeto procura implementar um autômato finito determinístico ([AFD](http://pt.wikipedia.org/wiki/Aut%C3%B4matos_finitos_determin%C3%ADsticos)) de
forma genérica. Aceitando uma especificação de linguagem e alfabeto e validando
a entrada com base nisso.

A entrada deve ser entregue via arquivo TXT ao aplicativo que permite procurar
um TXT qualquer na máquina do usuário.

## Regras

Não deve-se usar nenhum tipo de biblioteca de manipulação de string nem mesmo os
próprios mecanismos presentes na linguagem JavaScript além daqueles que permitem
extrair caracteres únicos através de um índice.

Exemplo: A utilização de funções como `String.protoype.charAt()` ou a utilização
da String como Array `"foo"[i]` para conseguir um caracter específico são permitidas,
contanto que o parâmetro de busca seja somente o índice do caracter.

## Tecnologias

HTML + CSS + JS.

O projeto é inteiramente possível no browser. Existem uma API chave que deve
ser suportada pelo browser para funcionar: A [File API](http://www.w3.org/TR/FileAPI/).

Para usar a API é simples, carrega um `<input type="file">` com o TXT e lê-se o arquivo
direto em JavaScript.

Essa API está presente em todos os [evergreen browsers](http://caniuse.com/#feat=fileapi).

## Interface

A interface pode ser construída através da combinação de HTML e CSS.

Pode ser utilizado algum framework de auxílio. No entanto para a simplicidade do
projeto não se faz necessário.

## Autores

[Matheus Kautzmann](https://github.com/mkautzmann/)

[Rômulo Alves](https://github.com/romuloalves/)

## Licença

[MIT License](LICENSE.md)
