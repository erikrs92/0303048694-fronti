import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

import { usersListComponent } from './users-list.component';
import { UserService } from '../../services/user';
import { userDetailsComponent } from '../user-details/user-details.component';

describe('usersListComponent', () => {
  let component: usersListComponent;
  let fixture: ComponentFixture<usersListComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['getAll', 'findByTitle']);
    const mockUsers = [{ id: 1, username: 'Test User', email: 'test@example.com', status: true }];
    userServiceSpy.getAll.and.returnValue(of(mockUsers));

    await TestBed.configureTestingModule({
      declarations: [ usersListComponent, userDetailsComponent ],
      imports: [ FormsModule, HttpClientTestingModule ],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { 
          provide: ActivatedRoute, 
          useValue: {
            snapshot: {
              params: { id: '123' }, // Simula los parámetros de ruta si es necesario
            },
            paramMap: of(convertToParamMap({ id: '123' })) // Simula un Observable para paramMap
          }
        }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();

    fixture = TestBed.createComponent(usersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter users by title', () => {
    // Configura el valor de retorno para 'findByTitle' antes de llamar al método del componente
    const filteredUsers = [
      { id: 2, username: 'Filtered User', email: 'filtered@example.com', status: false }
    ];
    userServiceSpy.findByTitle.and.returnValue(of(filteredUsers));

    component.username = 'Filtered';
    component.searchTitle(); // Ejecuta la funcionalidad que deseas probar

    // Verifica que los usuarios filtrados se establezcan correctamente en la propiedad del componente
    expect(component.users).toEqual(filteredUsers);
    // Verifica que el método 'findByTitle' haya sido llamado
    expect(userServiceSpy.findByTitle.calls.any()).toBe(true, 'findByTitle called');
  });
});
