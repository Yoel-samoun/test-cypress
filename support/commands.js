// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (login, mdp) => { 
    cy.get('input[name=username]').type(login)
    cy.get('input[name=password]').type(mdp)
    cy.get('[data-test="signin-submit"]').click()
})

Cypress.Commands.add('getBalance', () => {
    return cy.get('[data-test="sidenav-user-balance"]').invoke('text')
    .then(($el) => {
        return parseFloat($el.replace(/[,$€]/g, ''))
    })
})

// Cypress.Commands.add("signUp", (firstName, lastName, username, password) => {
// // création de compte user
// cy.visit('http://localhost:3000/signup');
// cy.get('[name="firstName"]').type(firstName);
// cy.get('[name="lastName"]').type(lastName);
// cy.get('[name="username"]').type(username);
// cy.get('[name="password"]').type(password);
// cy.get('[name="confirmPassword"]').type(password);
// cy.get('.MuiButton-label').click();
// });


// Cypress.Commands.add("createBankAccount", (bankName, routingNumber, accountNumber) => {
// // Création de compte autre
// cy.get('[data-test="sidenav-bankaccounts"]').click();
// cy.url().should('eq', "http://localhost:3000/bankaccounts");
// cy.get('[data-test="bankaccount-new"]').click();
// cy.url().should('eq', "http://localhost:3000/bankaccounts/new");
// });

// Cypress.Commands.add("loginFirstTime", (username,password,bankName, routingNumber, accountNumber) => {
// // Login + création de mon compte bancaire
// cy.visit('http://localhost:3000');
// cy.get('[name="username"]').type(username);
// cy.get('[name="password"]').type(password);
// cy.get('.MuiButton-label').click();
// cy.get('.MuiButton-label').eq(2).click(); // next
// cy.get('[id="bankaccount-bankName-input"]').type(bankName);
// cy.get('[id="bankaccount-routingNumber-input"]').type(routingNumber);
// cy.get('[id="bankaccount-accountNumber-input"]').type(accountNumber);
// cy.get('.MuiButton-label').eq(1).click(); // Save
// cy.get('.MuiButton-label').eq(2).click(); // Done
// cy.get('.MuiTypography-root.MuiListItemText-primary.MuiTypography-body1.MuiTypography-displayBlock').eq(4).click(); // logout
// });
