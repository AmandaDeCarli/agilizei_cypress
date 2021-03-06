/// <reference types="cypress"/>
import { format, prepareLocalStorage } from '../support/utils';

context('Dev Finances Agilizei', () => {
    beforeEach(() => {
        cy.visit('https://devfinance-agilizei.netlify.app',{
            onBeforeLoad: (win) => {
                prepareLocalStorage(win)
            }
        });
        cy.get('#data-table tbody tr').should('have.length', 2); 
    });
    it('Cadastrar entradas', () => {
        cy.get('#transaction .button').click();
        cy.get('#description').type('Mesada');
        cy.get('[name=amount]').type(12);
        cy.get('[type=date]').type('2021-09-06');
        cy.get('button').contains('Salvar').click();
        cy.get('#data-table tbody tr').should('have.length', 3); //espera que a tr tenha o tamanho de 1
    });

    it('Cadastrar saídas', () => {
        cy.get('#transaction .button').click();
        cy.get('#description').type('Mesada');
        cy.get('[name=amount]').type(-20);
        cy.get('[type=date]').type('2021-09-07');
        cy.get('button').contains('Salvar').click();
        cy.get('#data-table tbody tr').should('have.length', 3);
        
    });

    it('Remover entradas e saídas', () => {
        const entrada = 'Mesada';
        const saida = 'KinderOvo'

        cy.get('#transaction .button').click();
        cy.get('#description').type(entrada);
        cy.get('[name=amount]').type(100);
        cy.get('[type=date]').type('2021-09-07');
        cy.get('button').contains('Salvar').click();

        cy.get('#transaction .button').click();
        cy.get('#description').type(saida);
        cy.get('[name=amount]').type(-35);
        cy.get('[type=date]').type('2021-09-07');
        cy.get('button').contains('Salvar').click();

        cy.contains(entrada)
          .parent()
          .find('img[onclick*=remove]')
          .click();

        cy.get('td.description')
          .contains(saida)
          .siblings()
          .children('img[onclick*=remove]')
          .click();

         cy.get('#data-table tbody tr').should('have.length', 2);
    });

    it('Validar saldo com diversas transações', () =>{
        const entrada = 'Mesada';
        const saida = 'KinderOvo'
        cy.get('#transaction .button').click();
        cy.get('#description').type(entrada);
        cy.get('[name=amount]').type(100);
        cy.get('[type=date]').type('2021-09-07');
        cy.get('button').contains('Salvar').click();

        cy.get('#transaction .button').click();
        cy.get('#description').type(saida);
        cy.get('[name=amount]').type(-35);
        cy.get('[type=date]').type('2021-09-07');
        cy.get('button').contains('Salvar').click();

        let incomes = 0;
        let expenses = 0;
        cy.get('#data-table tbody tr')
          .each(($el, index, $list) => {
            cy.get($el).find('td.income, td.expense')//captura as linhas com transacoes e as colunas com valores 
              .invoke('text').then(text => {
                if(text.includes('-')){ 
                    expenses = expenses + format(text);
                }else{
                    incomes = incomes + format(text);
                }
                cy.log('Entrada',incomes);
                cy.log('Saídas',expenses);
              })
          })
          cy.get('#totalDisplay').invoke('text').then(text => {
              cy.log('valor total', format(text))
              let formattedTotalDisplay = format(text);
              let expectedTotal = incomes + expenses;

              expect(formattedTotalDisplay).to.eq(expectedTotal);
          })
          
    });
});
