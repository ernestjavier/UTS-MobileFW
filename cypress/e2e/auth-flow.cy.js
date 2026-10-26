// Alur: login -> logout -> sign up -> logout -> login akun baru, tanpa refresh
const visiblePage = () => cy.get('.ion-page:not(.ion-page-hidden)');

const expectDashboard = () => {
  visiblePage().contains('h1', 'Hello, Chef!').should('be.visible');
};

const expectLoginForm = () => {
  visiblePage().find('input[type=email]').should('be.visible');
};

const submitAuthForm = (email, password, name) => {
  if (name) visiblePage().find('input[type=text]').clear().type(name);
  visiblePage().find('input[type=email]').clear().type(email);
  visiblePage().find('input[type=password]').clear().type(password);
  visiblePage().find('button[type=submit]').click();
};

const logoutFromProfile = () => {
  visiblePage().contains('button', 'Profile').click();
  visiblePage().contains('button', 'Log Out').should('be.visible').click();
  cy.get('ion-alert:not(.overlay-hidden)').contains('.alert-button', /log out/i).click();
};

describe('Auth flow tanpa refresh', () => {
  it('bisa login, logout, sign up, logout, lalu login lagi', () => {
    const email = `cy${Date.now()}@mail.com`;

    cy.visit('/');
    expectLoginForm();

    submitAuthForm('ernest@mail.com', 'password123');
    expectDashboard();

    logoutFromProfile();
    expectLoginForm();

    visiblePage().contains('button', 'Sign up').click();
    submitAuthForm(email, 'pw12345', 'Cy Test');
    expectDashboard();

    logoutFromProfile();
    expectLoginForm();

    submitAuthForm(email, 'pw12345');
    expectDashboard();

    // Refresh saat sudah login tetap masuk tanpa perlu login ulang
    cy.reload();
    expectDashboard();

    // Pindah ke Profile lalu kembali ke Home
    visiblePage().contains('button', 'Profile').click();
    visiblePage().contains('h2', 'Cy Test').should('be.visible');
    cy.contains('.ion-page', 'My Profile').contains('button', 'Home').click();
    expectDashboard();
  });
});
