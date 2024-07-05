
/// <reference types="cypress" />
import { authorization, getAccounts} from '../../src/index';


describe('Приложение Coin', () => {
    beforeEach(() => {
        cy.visit('http://localhost:1234');
    });

    it('Проверка авторизации', () => {
        cy.get('#login').type('developer');
        cy.get('#pass').type('skillbox');

        cy.intercept('POST', '/login').as('loginRequest');

        cy.get('#form-login-btn').click();

        // Ожидаем успешного запроса на авторизацию
        cy.wait('@loginRequest').then((interception) => {
            const request = interception.request;
            const response = interception.response;

            expect(request.body).to.have.property('login', 'developer');
            expect(request.body).to.have.property('password', 'skillbox');
            expect(response.statusCode).to.equal(200);
        });

        
    });

    it('Проверка возможности просмотра списка счетов', () => {
        cy.get('#login').type('developer');
        cy.get('#pass').type('skillbox');
    
        cy.intercept('POST', '/login').as('loginRequest');
    
        cy.get('#form-login-btn').click();
    
        // Ожидаем успешного запроса на авторизацию
        cy.wait('@loginRequest').then((interception) => {
            const response = interception.response;
    
            expect(response.statusCode).to.equal(200);
    
            // Проверяем, что ответ содержит данные
            expect(response.body).to.not.be.null;
            expect(response.body).to.not.be.undefined;
    
            // После успешной авторизации делаем запрос на получение списка счетов
            cy.intercept('GET', '/account/74213041477477406320783754').as('accRequest');
    
            // Ожидаем ответ на запрос
            cy.wait('@accRequest').then((interception) => {
                const response = interception.response;
    
                expect(response.statusCode).to.equal(200);
    
                // Проверяем, что ответ содержит данные
                expect(response.body).to.not.be.null;
                expect(response.body).to.not.be.undefined;
            });
        });
    });
    
    
    it('Проверка возможности перевода суммы', () => {});

    it('Проверка создания нового счёта', () => {});
});
