# agilizei_cypress
Projeto com Cypress

Comandos para instalar e abrir o Cypress:
npm init --yes
npm install cypress
npx cypress open 

Fixtures- serve para armazenar arquivos de dados de mocks(json)

Integration - arquivos de testes .spec.js

Plugins- configuracoes de plugins 

Support - arquivos auxiliares e de suporte aos testes

*Screenshots - prints /screenshots durante o teste
*Videos - é possivel gravar videos durante os testes 

Hooks
Techos que executam antes e depois dos testes
before -> antes de tosos os testes 
beforeEach-> antes de cada teste 
after -> depois de todos os testes 
afterEach -> depois de cada teste 

Configuração para mobile pelo terminal
-Vai executar todos os testes com a resolução mobile

npx cypress open --config viewportWidth=411, viewportHeight=823

-Já executa o cypress no terminal 
npx cypress run --config viewportWidth=411, viewportHeight=823

Inserindo o comando no packge.json
-Adicionando em "scripts"
"cypress:run:mobile": "npx cypress open --config viewportWidth=411, viewportHeight=823"

"cypress:run": "npx cypress run--config viewportWidth=411, viewportHeight=823"

Linha 77 - cy.get($el).find('td.income, td.expense')//captura as linhas com transacoes e as colunas com valores 

Includes = verifica se existe o sinal negativo

Invoke = serve para invocar uma funcao js retorna o texto

Arquivo utils.js copiado arquivo go Github - formata o texto

localSorage = conteudo da página 

onBeforeLoad = antes de carregar a página utilizado em conjunto com o cy.visit



