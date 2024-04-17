describe('Verificar usuario deshabilitado', () => {
  let cantidadRegistros;
  
  before(() => {
    // Visita la página que contiene la tabla
    cy.visit('http://localhost:4200/users');

    // Selecciona todos los elementos <tr> dentro de la tabla y cuenta su cantidad
    cy.get('table tbody tr').its('length').then((cantidad) => {
      cantidadRegistros = cantidad;
    });
  });
  

  it('Buscar usuario deshabilitado', () => {

    let ultimoID=`AUTO_S9000000${cantidadRegistros}`;
    // Asumiendo que tu app corre en localhost:4200 y 'users' es el path donde se encuentra este formulario
    cy.visit('http://localhost:4200/users');

    // Escribe 'testuser' en el campo de búsqueda
    cy.get('input[placeholder="Search by username"]').type(`${ultimoID}`);

    // Haz clic en el botón de búsqueda
    cy.get('button').contains('Search').click();

    // Espera a que los resultados de la búsqueda se muestren y verifica que al menos un resultado contiene 'S900000008'
    cy.get('table').contains('td', `${ultimoID}`).should('be.visible');
    cy.wait(1000);
    // Opcional: Verifica otros detalles del usuario encontrado como el email o estado, asumiendo que los datos de 'testuser' son conocidos
    cy.get('table').within(() => {
      cy.contains('td', 'automated@canvia.com').should('be.visible');
//      cy.contains('td', 'Deshabilitado').should('be.visible');
    });

    // Espera a que la tabla esté presente en la página
    cy.get('table').should('be.visible');

    // Obtén todas las filas de la tabla
    cy.get('table tbody tr').first().click();
 
    cy.wait(1000);
    cy.get('button').contains('Editar').click();

    // Espera a que la página cargue completamente
    cy.wait(1000);

    // Cambiar el valor del estado (status) a habilitado (si está deshabilitado)
    cy.get('#status').then(($statusCheckbox) => {
      if ($statusCheckbox.is(':checked')) {
        cy.get('#status').uncheck(); // Si está habilitado, deshabilitarlo
      } else {
        cy.get('#status').check(); // Si está deshabilitado, habilitarlo
      }
    });

    // Hacer clic en el botón "Update"
    cy.contains('button', 'Update').click();

     // Esperar a que la actualización se complete (puedes ajustar el tiempo según sea necesario)
     cy.wait(5000);

     cy.visit('http://localhost:4200/users');
    
  });
});

 
