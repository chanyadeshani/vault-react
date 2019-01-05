describe('Login page', function () {


    it('Test Login page', function () {
        cy.visit('http://localhost:3000/');
        cy.contains('Remember me');
        cy.get('#username').type('admin');
        cy.get('#password').type('password');
        cy.get('.MuiButton-label-224').click();
        cy.get('#client-snackbar');
    });
});