const faker = require('faker');
faker.setLocale('fr')

function createAccount (firstname, lastname, username, password, bank, routingNumber, accountNumber) {

    cy.get('[data-test="signup"]').click()
    cy.get('#firstName').type(firstname)
    cy.get('#lastName').type(lastname)
    cy.get('#username').type(username)
    cy.get('#password').type(password)
    cy.get('#confirmPassword').type(password)
    cy.get('[data-test="signup-submit"]').click()

    cy.login(username, password)

    cy.get('[data-test="user-onboarding-next"]').click()
    
    fillBankAccount(bank, routingNumber, accountNumber)
    cy.get('[data-test="user-onboarding-next"]').click()
}

function fillBankAccount(bank, routingNumber, accountNumber){
    cy.get('#bankaccount-bankName-input').type(bank)
    cy.get('#bankaccount-routingNumber-input').type(routingNumber)
    cy.get('#bankaccount-accountNumber-input').type(accountNumber)
    cy.get('[data-test="bankaccount-submit"]').click()
}

function getNotificationCount() {
    return cy.get('[data-test="nav-top-notifications-count"]').invoke('text').then(parseInt)
}

function fillRandomBankAccount() {
    let bank = faker.company.companyName()
    let routingNumber = faker.finance.routingNumber()
    let accountNumber = faker.finance.routingNumber()
    fillBankAccount(bank, routingNumber, accountNumber)
}

function fillTransactionForm(amount) {
    cy.get('#amount').type(amount)
    cy.get('#transaction-create-description-input').type(faker.finance.transactionDescription())
    cy.get('[data-test="transaction-create-submit-payment"]').click()

    // wait for page to reload payment
    // cy.intercept('GET', '/checkAuth*').as('balance')
    // cy.wait('@balance')
    cy.wait(500)
    // cy.get('[data-test="new-transaction-return-to-transactions"]').click()
}

describe('Create account and check balance', () => {
    beforeEach(() => {
        cy.visit(Cypress.env('url'))
    })
    
    let firstname = faker.name.firstName()
    let lastname = faker.name.lastName()
    let username = faker.internet.userName()
    let password = faker.internet.password()
    let bank = faker.company.companyName()
    let routingNumber = faker.finance.routingNumber()
    let accountNumber = faker.finance.routingNumber()
    
    it('Create new user and check balance is zero', () => {
        createAccount(firstname, lastname, username, password, bank, routingNumber, accountNumber)
        cy.getBalance().should('be.eq', 0)
    })

    it('Check user balance with money', () => {
        cy.login(Cypress.env('login'), Cypress.env('mdp'))
        cy.getBalance().should('not.be.eq', 0)
    })
    
    it('Create, then delete bank accounts', () => {
        cy.login(Cypress.env('login'), Cypress.env('mdp'))
        
        cy.get('[data-test="sidenav-bankaccounts"]').click()
        // cy.get('[data-test="bankaccount-delete"]').first().should("be.visible")
        for (let i = 0; i < 3; i++) {
            cy.get('[data-test="bankaccount-new"]').click({scrollBehavior: "center"})
            fillRandomBankAccount()
        }
        cy.wait(300) // wait for account to be created

        // delete all bank accounts
        cy.get('[data-test="bankaccount-delete"]').each(($el) => {
            cy.wrap($el).click({scrollBehavior: "center"})
            cy.wait(100)
        })

    })

    it('Check notification count', () => {
        cy.login(Cypress.env('login'), Cypress.env('mdp'))
        cy.get('[data-test="nav-top-notifications-count"]').click()
        getNotificationCount().then(($cnt) => {
        cy.get('[data-test="notifications-list"]').children()
            .should('have.length', $cnt)
        })
    })
    
    it('Check negative payment', () => {
        cy.login(Cypress.env('login'), Cypress.env('mdp'))
        cy.getBalance().then(($balanceBefore) => {
            cy.get('[data-test="nav-top-new-transaction"]').click()
            cy.get('[data-test="users-list"]').first().click()
            let amount = faker.datatype.number({min: -10000, max: 0})
            fillTransactionForm(amount)
            cy.getBalance().should("not.be.eq", $balanceBefore - amount)
        })
    })

    it('Check balance after regular payment', () => {
        cy.login(Cypress.env('login'), Cypress.env('mdp'))
        cy.getBalance().then(($balanceBefore) => {
            cy.get('[data-test="nav-top-new-transaction"]').click()
            cy.get('[data-test="users-list"]').first().click()
            let amount = faker.datatype.number({max: 100})
            fillTransactionForm(amount)
            cy.getBalance().should("be.eq", $balanceBefore - amount)
        })
    })

})



// 1) Créer un compte de A à Z

// 2) Vérifier que la balance du compte est bien à 0$

// 3) Créer un test qui va effacer tous les bank accounts à l'écran
// -> Récupérer le nombre de comptes à l'écran
// -> Les effacer

// 4) Afficher les rapports
// -> Effacer tous les comptes existants
// -> Créer les comptes avec faker

// 5) Récupérer le nombre de notifications
// -> Checker que la pastille sur la cloche est égale au nombre de lignes dans notifications

// 6) Nouveau versement
// -> Faire un versement négatif voir si ca marche
// -> Faire un versement normal 

//     . Choisir le compte

//     . Voir la balance avant

//     . Voir la balance après

// -> Rapports

// 7) Pour la balance convertir en currency