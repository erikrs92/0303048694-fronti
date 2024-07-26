describe('Registro de usuario con status false', () => {
  let cantidadRegistros;
  
  before(() => {
    // Visita la página que contiene la tabla
    cy.visit('http://192.168.1.94/users');
    cy.screenshot('1_CASO022_Antes_Agregar');
    // Selecciona todos los elementos <tr> dentro de la tabla y cuenta su cantidad
    cy.get('table tbody tr').its('length').then((cantidad) => {
      cantidadRegistros = cantidad+1;
    });
  });
  
  it('Agregar nuevo usuario', () => {
    let proximoID=`AUTO_S9000000${cantidadRegistros}`;


    // Visitar la página de registro de usuario
    cy.visit('http://192.168.1.94/add');

    
    // Llenar el formulario de registro con los datos del usuario
    cy.get('#username').type(`${proximoID}`);
    cy.get('#email').type('automated@canvia.com');
    cy.get('#password').type(`${proximoID}`);
    cy.get('#status').uncheck(); // Estado (status) falso
    cy.screenshot('2_CASO022_Llenandoformulario');

    cy.wait(1000);
    // Hacer clic en el botón "Submit" para agregar el nuevo usuario
    cy.contains('button', 'Submit').click();

    // Esperar a que aparezca el mensaje de éxito "Agregado correctamente!"
    cy.contains('Agregado correctamente!').should('be.visible');
    cy.screenshot('3_MensajeConfirmacion');
    cy.wait(1000);

    // Volver a la lista de usuarios en http://192.168.1.94/users
    cy.visit('http://192.168.1.94/users');
    cy.screenshot('4_CASO022_finFlujo');

    // Verificar que el nuevo usuario esté en la lista
    cy.get('table tbody').contains(`${proximoID}`).should('be.visible');
  });
});
